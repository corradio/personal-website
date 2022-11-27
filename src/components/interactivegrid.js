import React, { useState } from 'react';

const GRID_CONNECTION_HEIGHT = 100;

export const DEFAULT_CONFIG = {
  generators: {
    // g1: { type: 'nuclear', energy: 2, gridKey: 'A' },
    g2: { type: 'coal', energy: 1, gridKey: 'A' },
    g3: { type: 'wind', energy: 1, gridKey: 'A' },
    // g4: { type: 'wind', energy: 1, gridKey: 'A' },
    g5: { type: 'hydro', energy: 1, gridKey: 'B' },
  },
  consumers: {
    c1: {
      type: 'household',
      gridKey: 'A',
      emissionFactor: null,
      originMix: null,
      // purchases: ['g3'],
    },
    c2: {
      type: 'factory',
      gridKey: 'A',
      purchases: ['g3'],
      emissionFactor: null,
      originMix: null,
    },
    c3: {
      type: 'factory',
      gridKey: 'B',
      // purchases: ['g4'],
      emissionFactor: null,
      originMix: null,
    },
  },
};

const modeColor = {
  solar: '#f27406',
  wind: '#74cdb9',
  hydro: '#2772b2',
  'hydro storage': '#0052cc',
  battery: 'lightgray',
  'battery storage': '#b76bcf',
  biomass: '#166a57',
  geothermal: 'yellow',
  nuclear: '#AEB800',
  gas: '#bb2f51',
  coal: '#ac8c35',
  oil: '#867d66',
  unknown: '#ACACAC',
};

const configByGrid = (config) => {
  const byGrid = {};
  Object.entries(config).forEach(([k, v]) => {
    Object.entries(v).forEach(([kk, vv]) => {
      const { gridKey } = vv;
      if (!byGrid[gridKey]) {
        byGrid[gridKey] = {};
      }
      if (!byGrid[gridKey][k]) {
        byGrid[gridKey][k] = {};
      }
      if (!byGrid[gridKey][k][kk]) {
        byGrid[gridKey][k][kk] = {};
      }
      byGrid[gridKey][k][kk] = vv;
    });
  });
  return byGrid;
};

const averageMix = (generators) => {
  // Compute grid average mix
  let totalEnergy = 0;
  const byGeneration = {};
  Object.entries(generators).forEach(([generatorKey, generator]) => {
    totalEnergy += generator.energy;
    byGeneration[generatorKey] = generator.energy;
  });
  // Compute ratios
  Object.keys(byGeneration).forEach((k) => {
    byGeneration[k] /= totalEnergy;
  });
  return byGeneration;
};

const locationBased = (config) => {
  // deep copy
  const attributedConfig = JSON.parse(JSON.stringify(config));
  // Group by grid
  const byGrid = configByGrid(attributedConfig);
  Object.entries(byGrid).forEach(([gridKey, gridConfig]) => {
    const byGeneration = averageMix(gridConfig.generators);
    // Assign
    Object.values(attributedConfig.consumers)
      .filter(consumer => consumer.gridKey === gridKey)
      .forEach((consumer) => {
        consumer.originMix = byGeneration;
      });
  });
  return attributedConfig;
};

const loadAveragedMixes = (arr, mixAccessor, loadAccessor) => {
  const sumByKey = {};
  const totalLoad = arr.map(loadAccessor).reduce((a, b) => a + b, 0);
  arr.forEach(d =>
    Object.entries(mixAccessor(d)).forEach(([k, v]) => {
      sumByKey[k] = (sumByKey[k] || 0) + loadAccessor(d) * v;
    }));
  Object.keys(sumByKey).forEach((k) => {
    sumByKey[k] /= totalLoad;
  });
  return sumByKey;
};

const generatorHasSoldContract = (g, config, contractualKey) =>
  !(!g.purchasers || (g.purchasers && !config.consumers[g.purchasers[0]][contractualKey]));

const marketBased = (config, contractualKey) => {
  // deep copy
  const attributedConfig = JSON.parse(JSON.stringify(config));
  // Group by grid
  const byGrid = configByGrid(attributedConfig);

  // first allocate all contractual instruments
  const allocatedConsumers = [];
  Object.values(attributedConfig.consumers)
    .filter(d => d[contractualKey])
    .forEach((consumer) => {
      allocatedConsumers.push(consumer.key);
      // assume only a single purchase
      consumer.originMix = { [consumer[contractualKey][0]]: 1 };
    });

  const surplusMixForGrids = Object.entries(byGrid).map(([key, grid]) => {
    const gridLoad = Object.values(grid.generators)
      .map(d => d.energy)
      .reduce((a, b) => a + b, 0);
    const purchasedGeneration = Object.values(grid.consumers)
      .filter(c => c[contractualKey])
      .map(c => attributedConfig.generators[c[contractualKey][0]].energy)
      .reduce((a, b) => a + b, 0);
    const soldGeneration = Object.values(grid.generators)
      // only consider the purchasers who purchased the right instrument
      .map(g =>
        (g.purchasers || [])
          .map(consumerKey => [g, consumerKey])
          .filter(([_, consumerKey]) => attributedConfig.consumers[consumerKey][contractualKey])
          .map(([g, _]) => g))
      .flat()
      .map(d => d.energy)
      .reduce((a, b) => a + b, 0);
    const gridLoadAfterContract = gridLoad
      // add purchased generation
      + purchasedGeneration
      // subtract sold generation
      - soldGeneration;

    if (gridLoadAfterContract >= gridLoad) {
      // all remaining consumers get the remaining grid mix
      const remainingGenerators = {};
      Object.values(grid.generators)
        // only exclude the purchasers who purchased the right instrument
        .filter(g => !generatorHasSoldContract(g, attributedConfig, contractualKey))
        .forEach((g) => {
          remainingGenerators[g.key] = g;
        });
      const residualMix = averageMix(remainingGenerators);
      const hasResidualMix = Object.keys(grid.generators).join('') !== Object.keys(remainingGenerators).join('');
      Object.values(grid.consumers)
        .filter(consumer => !allocatedConsumers.includes(consumer.key))
        .forEach((consumer) => {
          consumer.hasResidualMix = hasResidualMix;
          consumer.originMix = residualMix;
        });
      // return the surplus mix to be used by others
      return {
        key,
        surplusLoad: gridLoadAfterContract - gridLoad,
        residualMix,
      };
    } 
    return {
      key,
      surplusLoad: gridLoadAfterContract - gridLoad,
    };
  });

  const surplusMix = loadAveragedMixes(
    surplusMixForGrids.filter(d => d.surplusLoad > 0),
    d => d.residualMix,
    d => d.surplusLoad,
  );
  // For each grid, assign the surplus mix to the remaining load
  surplusMixForGrids
    .filter(d => d.surplusLoad < 0)
    .forEach(({ key, surplusLoad }) => {
      const grid = byGrid[key];
      const remainingGenerators = {};
      Object.entries(grid.generators)
        // only exclude the purchasers who purchased the right instrument
        .filter(([_, g]) => !generatorHasSoldContract(g, attributedConfig, contractualKey))
        .forEach(([k, generator]) => {
          remainingGenerators[k] = generator;
        });
      const gridLoad = Object.values(remainingGenerators)
        .map(d => d.energy)
        .reduce((a, b) => a + b, 0);
      const residualMix = loadAveragedMixes(
        [
          { load: gridLoad, mix: averageMix(remainingGenerators) },
          { load: -1 * surplusLoad, mix: surplusMix },
        ],
        d => d.mix,
        d => d.load,
      );
      const hasResidualMix = Object.keys(grid.generators).join('') !== Object.keys(remainingGenerators).join('');
      Object.values(grid.consumers)
        .filter(consumer => !allocatedConsumers.includes(consumer.key))
        .forEach((consumer) => {
          consumer.hasResidualMix = hasResidualMix;
          consumer.originMix = residualMix;
        });
    });

  return attributedConfig;
};

const attributionRules = {
  locationBased,
  marketBased: config => marketBased(config, 'purchases'),
};

const EnergyBlock = ({ type, style }) => (
  <div style={{
    width: '6px', height: '6px', backgroundColor: modeColor[type], ...style, 
  }}
  />
);

const Generator = ({ generator }) => (
  <div
    key={generator.key}
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
    }}
  >
    {`${generator.type} generator`}
    <div style={{
      display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: '5px', 
    }}
    >
      {Array.from(Array(generator.energy)).map((_, i) => (
        <EnergyBlock key={i} type={generator.type} style={{ margin: '1px' }} />
      ))}
    </div>
  </div>
);

const Consumer = ({ consumer, config }) => {
  const byMix = {};
  Object.entries(consumer.originMix).forEach(([generatorKey, v]) => {
    const { type } = config.generators[generatorKey];
    if (!byMix[type]) {
      byMix[type] = 0;
    }
    byMix[type] += v;
  });

  return (
    <>
      <div>{`consumer ${consumer.key.slice(1)}`}</div>
      <small>{consumer.hasResidualMix ? '(residual mix)' : null}</small>
      <small>
        {Object.entries(byMix)
          .sort((a, b) => b[1] - a[1]) // desc
          .map(([type, v]) => (
            <div key={type} style={{ display: 'flex', alignItems: 'baseline' }}>
              <EnergyBlock key={type} type={type} style={{ marginRight: '4px', width: v * 30 }} />
              {`${type}: ${Math.round(v * 100)} %`}
            </div>
          ))}
      </small>
    </>
  );
};

const GridGenerators = ({ generators }) => {
  const generatorArray = Object.values(generators);
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
      {Object.entries(generators).map(([generatorKey, generator], i) => {
        const nextGenerator = generatorArray[i + 1];
        const prevGenerator = generatorArray[i - 1];
        const isConnectedToNext = generator.gridKey === nextGenerator?.gridKey;
        const isConnectedToPrev = generator.gridKey === prevGenerator?.gridKey;
        const extraStyles = {};
        if (isConnectedToPrev || isConnectedToNext) {
          extraStyles.borderBottom = '1px solid';
          if (isConnectedToPrev && isConnectedToNext) {
            extraStyles.borderColor = '#000';
          } else {
            extraStyles.borderImage = `linear-gradient(to ${
              isConnectedToNext ? 'left' : 'right'
            }, #000 50%, rgba(0, 0, 0, 0) 50%) 100% 1`;
          }
        }
        return (
          <div
            key={generatorKey}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flex: 1, // take equal horizontal space
              ...extraStyles,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Generator key={generator.key} generator={generator} />
              <div style={{ backgroundColor: '#000', height: 10, width: 1 }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const GridConsumers = ({ config, configByGrid }) => {
  const totalGenerators = Object.values(configByGrid).reduce(
    (a, b) => Object.values(a.generators).length + Object.values(b.generators).length,
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
      {Object.entries(configByGrid).map(([gridKey, gridConfig]) => {
        const gridGenerators = Object.values(gridConfig.generators);
        const gridConsumers = Object.values(gridConfig.consumers);
        return (
          <div
            key={gridKey}
            style={{
              display: 'flex',
              flex: 1, // take equal horizontal space
              flexDirection: 'column',
              alignItems: 'stretch', // children will take all horizontal space
              flexBasis: `${(gridGenerators.length / totalGenerators) * 100}%`,
            }}
          >
            <div
              style={{
                alignSelf: 'center',
                backgroundColor: '#000',
                height: GRID_CONNECTION_HEIGHT,
                width: 1,
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                flex: 1, // take equal horizontal space
              }}
            >
              {gridConsumers.map((consumer, i) => {
                const isConnectedToNext = gridConsumers[i + 1] != null;
                const isConnectedToPrev = gridConsumers[i - 1] != null;
                const extraStyles = {};
                if (isConnectedToPrev || isConnectedToNext) {
                  extraStyles.borderTop = '1px solid';
                  if (isConnectedToPrev && isConnectedToNext) {
                    extraStyles.borderColor = '#000';
                  } else {
                    extraStyles.borderImage = `linear-gradient(to ${
                      isConnectedToNext ? 'left' : 'right'
                    }, #000 50%, rgba(0, 0, 0, 0) 50%) 100% 1`;
                  }
                }
                return (
                  <div
                    key={consumer.key}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flex: 1, // take equal horizontal space
                      ...extraStyles,
                    }}
                  >
                    <div style={{ backgroundColor: '#000', height: 10, width: 1 }} />
                    <Consumer consumer={consumer} config={config} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const AnnotationLayer = ({ config, configByGrid, attributionRule }) => {
  const allGeneratorKeys = Object.keys(config.generators);
  const allGridKeys = Object.keys(configByGrid);
  // The following is the ratio occupied by each grid
  const gridHorizontalRatios = Object.values(configByGrid).map(
    grid => Object.keys(grid.generators).length / allGeneratorKeys.length,
  );

  const purchaseKeys = attributionRule === attributionRules.marketBased ? ['purchases'] : [];
  const purchaseLabels = attributionRule === attributionRules.marketBased ? ['contract'] : [];

  const purchaseLineSpecs = purchaseKeys
    .map((k, i) => Object.values(config.consumers)
      .filter(consumer => consumer[k]?.length)
      .map(consumer => consumer[k].map(fromKey => [fromKey, consumer.key]))
      .flat()
      .map(([fromKey, toKey]) => {
        const generatorInterval = 100 / allGeneratorKeys.length;
        let x1 = 0.5 * generatorInterval + allGeneratorKeys.indexOf(fromKey) * generatorInterval;
        const y1 = 18;

        const consumerGridKey = config.consumers[toKey].gridKey;
        const gridIndex = allGridKeys.indexOf(consumerGridKey);
        const consumerKeysInGrid = Object.keys(configByGrid[consumerGridKey].consumers);
        const indexWithinGrid = consumerKeysInGrid.indexOf(toKey);
        const consumerInterval = (gridHorizontalRatios[gridIndex] / consumerKeysInGrid.length) * 100;
        const consumerStart = gridHorizontalRatios.slice(0, gridIndex).reduce((a, b) => a + b, 0) * 100; // add the offset from potential previous grids
        let x2 = consumerStart + consumerInterval * 0.5 + indexWithinGrid * consumerInterval;
        const y2 = 50 + GRID_CONNECTION_HEIGHT / 10;

        // Sugar
        x1 += (x2 - x1 > 0 ? 1 : -1) * 3; // top (generator) x
        if (Math.abs(x2 - x1) > 10) {
          x2 += (x2 - x1 < -10 ? 1 : -1) * 3; // bottom (consumer) x
        }

        return {
          x1, y1, x2, y2, fromKey, toKey, label: purchaseLabels[i], 
        };
      }))
    .flat();

  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
      }}
    >
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
      </defs>
      {purchaseLineSpecs.map(({
        x1, y1, x2, y2, fromKey, toKey, label, 
      }) => (
        <g key={label}>
          <line
            key={fromKey + toKey}
            x1={`${x1}%`}
            y1={`${y1}%`}
            x2={`${x2}%`}
            y2={`${y2}%`}
            stroke="darkblue"
            strokeDasharray="4"
            markerEnd="url(#arrowhead)"
          />
          <text
            x={`${0.5 * (x1 + x2)}%`}
            y={`${0.5 * (y1 + y2)}%`}
            textAnchor="middle"
            style={{ stroke: 'white', strokeWidth: '0.6em' }}
          >
            {label}
          </text>
          <text x={`${0.5 * (x1 + x2)}%`} y={`${0.5 * (y1 + y2)}%`} textAnchor="middle">
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default ({ config, attributionRuleKey, style }) => {
  const buyer = 'c2';
  const [seller, setSeller] = useState(config.consumers[buyer].purchases[0]);
  const handleChangeSeller = (e) => {
    setSeller(e.target.value);
  };

  // deep copy
  const updatedConfig = JSON.parse(JSON.stringify(config));
  updatedConfig.consumers = {
    ...updatedConfig.consumers,
    [buyer]: { ...updatedConfig.consumers[buyer], purchases: [seller] },
  };

  // Index
  Object.keys(updatedConfig.generators).forEach((k) => {
    updatedConfig.generators[k].key = k;
  });
  Object.entries(updatedConfig.consumers).forEach(([consumerKey, consumer]) => {
    consumer.key = consumerKey;
    ['purchases'].forEach((kk) => {
      (consumer[kk] || []).forEach((generatorKey) => {
        if (!updatedConfig.generators[generatorKey].purchasers) {
          updatedConfig.generators[generatorKey].purchasers = [];
        }
        updatedConfig.generators[generatorKey].purchasers.push(consumerKey);
      });
    });
  });

  const attribute = attributionRules[attributionRuleKey];
  const attributedConfig = attribute(updatedConfig);
  const byGrid = configByGrid(attributedConfig);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        ...style,
      }}
    >
      <div style={{ position: 'relative' }}>
        <AnnotationLayer
          config={attributedConfig}
          configByGrid={byGrid}
          attributionRule={attribute}
        />
        <GridGenerators generators={attributedConfig.generators} />
        <GridConsumers config={attributedConfig} configByGrid={byGrid} />
      </div>
      {attributionRuleKey === 'marketBased' ? (
        <span>
          <br />
          &quot;consumer 2&quot; has a contract with the{' '}
          <select onChange={handleChangeSeller}>
            {Object.keys(config.generators)
              .filter(k => !['coal'].includes(config.generators[k].type))
              .map(k => (
                <option key={k} value={k} selected={k === seller}>
                  {config.generators[k].type}
                </option>
              ))}
          </select>
          {' generator'}
        </span>
      ) : null}
    </div>
  );
};
