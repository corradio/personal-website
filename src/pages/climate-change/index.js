import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';

import theme from '../../utils/themeconstants';
import Layout from '../../components/layout';
import SEO from '../../components/seo';

import { rhythm } from '../../utils/typography';

import GlobalTempGraph from './graphs/globalTemp';
import TempAnnomalies from './graphs/tempAnnomalies';
import AtmosphericCo2 from './graphs/atmosphericCo2';
import RelativeChanges from './graphs/relativeChanges';
import ManMadeEmissions from './graphs/manMadeEmissions';
import WorldPrimaryEnergy from './graphs/worldPrimaryEnergy';
import PersonalFootprint from './graphs/personalFootprint';
import EmissionsByCountry from './graphs/emissionsByCountry';
import Transportation from './graphs/transportation';
import Electricity from './graphs/electricity';
import Food from './graphs/food';

const Disclamer = styled.p`
  font-size: 12px;
  opacity: 0.8;
`;

const ToC = styled.div`
  h3 {
    margin-bottom: 0.2em;
  }
  ul {
    list-style: none;
    li {
      margin: 0 0 0.25em 0;
      a {
        display: inline-block;
        line-height: 22px;
        text-decoration: none;
      }
    }
  }
`;

const ClimateChange = ({ data, location }) => (
  <Layout location={location}>
    <SEO
      title="A Pragmatic Guide to Climate Change"
      description="This is a pragmatic guide to what Climate Change is, what the drivers behind it are, and what we as individuals can do about it."
      previewImageURL="https://user-images.githubusercontent.com/1655848/29027789-6f2358b0-7b82-11e7-882f-af0ca55703a1.png"
    />
    <h1 style={{ marginTop: rhythm(2) }}>
      A Pragmatic Guide to Climate Change
    </h1>
    <Disclamer>
      <b>Last updated: March 20th, 2022 · 16 min read</b>
      <br />
      If you see anything inconsistent, or would like to propose a change,
      please reach out.
    </Disclamer>
    <p>
      This is a pragmatic guide to what Climate Change is, what the drivers
      behind it are, and what we as individuals can do about it.
    </p>
    <ToC>
      <h3>1. The Earth</h3>
      <ul>
        <li>
          <a href="#the-state-of-climate-change">The state of Climate Change</a>
        </li>
        <li>
          <a href="#consequences">Consequences</a>
        </li>
        <li>
          <a href="#what-causes-it?">What causes it</a>
        </li>
      </ul>
      <h3>2. Humans</h3>
      <ul>
        <li>
          <a href="#where-do-greenhouse-gases-come-from?">
            Where do greenhouse gases come from?
          </a>
        </li>
        <li>
          <a href="#fossil-fuels-are-used-everywhere--and-for-good-reasons">
            Fossil fuels are used everywhere, and for good reasons
          </a>
        </li>
      </ul>
      <h3>3. What can we do?</h3>
      <ul>
        <li>
          <a href="#objective--2-tons-co2eq-per-human-per-year-by-2050">
            Objective: 2 tons CO2eq per human per year by 2050
          </a>
        </li>
        <li>
          <a href="#transportation--reduce-long-distance-travels">
            Transportation: Reduce long-distance travels
          </a>
        </li>
        <li>
          <a href="#electricity--remove-coal--gas-and-oil-power-plants">
            Electricity: remove coal, gas and oil power plants
          </a>
        </li>
        <li>
          <a href="#food--avoid-red-meat">Food: avoid red meat</a>
        </li>
        <li>
          <a href="#information-must-be-accessible-and-widely-spread">
            Information must be accessible and widely spread
          </a>
        </li>
      </ul>
    </ToC>
    <hr />
    <h2>1. The Earth</h2>
    <h3 id="the-state-of-climate-change">The state of Climate Change</h3>
    <p>
      &#8217;Warming of the climate system is unequivocal, and since the 1950s,
      many of the observed changes are unprecedented over decades to
      millennia&#8217;, writes the Intergovernmental Panel on Climate Change
      (IPCC) in its{' '}
      <Link
        outward
        href="http://www.ipcc.ch/pdf/assessment-report/ar5/syr/AR5_SYR_FINAL_SPM.pdf"
      >
        fifth assessment
      </Link>
      .
    </p>
    <GlobalTempGraph />
    <p>
      Seventeen of the 18 warmest years have all occurred since 2001 (with the
      exception of 1998). Furthermore, NOAA reported in August 2016 that each of
      the previous 16 months{' '}
      <Link outward href="https://www.ncdc.noaa.gov/sotc/global/201607#temp">
        were the warmest they&#8217;ve ever measured
      </Link>
      . The measured warming has been found to be consistent across{' '}
      <Link outward href="https://data.giss.nasa.gov/gistemp/graphs/">
        seasons
      </Link>{' '}
      and{' '}
      <Link
        outward
        href="https://twitter.com/anttilip/status/891730388497965056"
      >
        regions.
      </Link>
    </p>
    <p>
      We have now achieved a temperature increase of 1&deg;C since the end of
      the 70s. <b>A change of 1&deg;C in 50 years is unprecedented</b>, as it
      can be seen from the following reconstruction of temperatures in the last
      11&nbsp;000 years:
    </p>
    <TempAnnomalies />
    <p>
      What is worrying is not so much the change itself, but rather{' '}
      <b>the speed at which this change is taking place.</b> Historically, a
      change of 1&deg;C seems to happen in thousands of years - not decades. The
      Earth is a complex ecosystem, and disturbing it by as little as a couple
      of degrees in the blink of decades (or even centuries) is a heavy
      disturbance.
    </p>

    <h3 id="consequences">Consequences</h3>
    <p>
      A couple of degrees change in the average yearly temperature is far from a
      minor event.{' '}
      <Link
        outward
        href="https://jancovici.com/en/climate-change/predicting-the-future/how-do-the-present-temperatures-compare-to-the-past-ones/"
      >
        When Earth&#8217;s temperature was 5&deg;C lower
      </Link>
      , the sea level was 120m lower and all of Northern Europe and Canada were
      covered by a gigantic ice cap (one could hike from Vermont to Greenland).
      Furthermore, average temperatures do not tell the whole story. As average
      temperatures increase, the likelihood of extreme temperature events{' '}
      <Link
        outward
        href="https://www.nytimes.com/interactive/2017/07/28/climate/more-frequent-extreme-summer-heat.html"
      >
        might increase as well
      </Link>
      .
    </p>
    <p>
      A change of a couple of degrees over the surface of the Earth first causes
      the oceans to absorb the extra heat. In the process, they expand (raising
      the sea level) and cause increased evaporation, which leads to perturbed
      air and water currents. This yields an increased likelihood of extreme
      weather events, such as drought, hurricanes or floods. This is already
      observed as e.g. coral reefs are{' '}
      <Link
        outward
        href="https://www.nytimes.com/2017/03/15/science/great-barrier-reef-coral-climate-change-dieoff.html"
      >
        starting to die
      </Link>
      .
    </p>
    <p>
      Longer term effects are harder to quantify as a temperature change this
      sudden has never been witnessed in the past. To get a rough idea,{' '}
      <Link
        outward
        href="http://bigthink.com/strange-maps/what-the-world-will-look-like-4degc-warmer"
      >
        this map
      </Link>{' '}
      shows what the world will look like 4° warmer while{' '}
      <Link
        outward
        href="http://www.bbc.com/future/story/20170808-climate-change-is-disrupting-the-birds-and-the-bees"
      >
        this article
      </Link>{' '}
      shows how sensitive birds and bees are to climate change. Furthermore,
      higher temperatures and more extreme weather causes crops to fail, which
      could{' '}
      <Link
        outward
        href="https://www.theguardian.com/environment/2020/sep/09/climate-crisis-could-displace-12bn-people-by-2050-report-warns"
      >
        force 1.2 billion people to migrate by 2050
      </Link>
      , causing{' '}
      <Link
        outward
        href="https://www.technologyreview.com/s/603158/hotter-days-will-drive-global-inequality/"
      >
        increased inequalities
      </Link>{' '}
      leading to global instability. Finally, the inability of the human body to
      cool itself in high temperature and humidity situations might cause more
      than{' '}
      <Link
        outward
        href="https://www.nature.com/articles/nclimate3322.epdf?referrer_access_token=h4PBfD3a4GBaHeQGPTU5wdRgN0jAjWel9jnR3ZoTv0Nlcpopxh1V5GdQz8yAIWjCHGoX0C2JETPVTCPUgabFL6jn6xbLNDYS6otDb1Wc4O0lHjHoWbGg6vtZzisuZOVhFylgVJ2Shbbeu97daifPL-RGZI83_c96h9lyaqGQc_oamHsBRztEjz0ylJEk96MW41sEDrzroTlB2IY-QHhh3s9rVIeT8OkKoDJIgSTB_EE_hw0Xtbwi3I2_L-hsrS_qsJ4exC9JzaCryDLYxnKJqg%3D%3D"
      >
        half of the world population to live in inhabitables areas by 2100
      </Link>
      .
    </p>

    <p>Climate change is indeed the most serious issue of our time.</p>

    <h3 id="what-causes-it?">What causes it?</h3>
    <p>
      Some gases are transparent to the sun&#8217;s <b>incoming rays</b> heating
      the Earth, but are opaque (acting as mirrors) with respect to{' '}
      <b>outgoing rays</b> emitted back from the Earth. Those gases act as a
      blanket, trapping heat that is unable to escape. They are called
      greenhouse gases due to their warming behaviour. This{' '}
      <Link outward href="https://en.wikipedia.org/wiki/Greenhouse_effect">
        greenhouse effect
      </Link>{' '}
      stabilises our climate, keeping nights relatively warm despite being
      deprived of sunlight.
    </p>
    <p>
      One of those greenhouse gases is carbon dioxide (CO<sub>2</sub>). By
      drilling{' '}
      <Link
        outward
        href="https://earthobservatory.nasa.gov/Features/Paleoclimatology_IceCores/"
      >
        ice cores
      </Link>{' '}
      (columns of ice containing small bubbles of old trapped air), scientists
      have been able to infer historical CO <sub>2</sub> concentration up to
      800&nbsp;000 years BC. This concentration has been relatively stable up to
      the industrial revolution, where it skyrocketed. Again, what is worrying
      is the speed at which the change of concentration is happening. Both the
      concentration level and the speed of change are unprecedented in the
      history of measurements (use the handles at the bottom of the graph to
      zoom in and out):
    </p>
    <AtmosphericCo2 />
    <p>
      The{' '}
      <Link
        outward
        href="https://www.epa.gov/climate-indicators/climate-change-indicators-atmospheric-concentrations-greenhouse-gases"
      >
        same trend is visible
      </Link>{' '}
      with other greenhouse gases such as methane (CH<sub>4</sub>) and nitrous
      oxide (N<sub>2</sub>O).
    </p>
    <p>
      By comparing the factors causing heating and cooling of the atmosphere
      between the pre-industrial period (where the greenhouse gas atmospheric
      levels had not yet increased) and now, we observe that the drastic
      increase in greenhouse gases{' '}
      <Link
        outward
        href="https://www.bloomberg.com/graphics/2015-whats-warming-the-world/"
      >
        is the main driver behind the observed warming
      </Link>{' '}
      (although some other effects do cause a certain amount of cooling):
    </p>
    <RelativeChanges />
    <p>
      It is important to state that
      <b>
        {' '}
        some greenhouse gases will keep warming the Earth many years after they
        have been emitted
      </b>
      , because they do not disappear instantaneously. Up to 40% of the CO
      <sub>2</sub> emitted today{' '}
      <b>will still be present 1 000 years from now</b>, thus still causing
      warming (see FAQ 12.3{' '}
      <Link
        outward
        href="http://www.ipcc.ch/pdf/assessment-report/ar5/wg1/WG1AR5_Chapter12_FINAL.pdf"
      >
        here
      </Link>
      ).{' '}
      <Link
        outward
        href="http://jancovici.com/en/climate-change/predicting-the-future/will-climate-change-get-rapidely-to-a-halt-if-we-quickly-decrease-the-emissions/"
      >
        If we were to stop emissions today
      </Link>
      , CO<sub>2</sub> levels would essentially never come back to its
      pre-industrial level on timescales relevant for our society.
    </p>
    <p>
      This is in stark contrast with the immediate and ephemeral cooling effect
      of volcanoes eruptions or{' '}
      <Link
        outward
        href="https://earthobservatory.nasa.gov/Features/Aerosols/page3.php"
      >
        man-made aerosols
      </Link>{' '}
      such as sulphates, nitrate or soot that stay in the atmosphere for a very
      short time. It is therefore very important to reduce greenhouse gas
      emissions very quickly, as{' '}
      <b>
        they will affect the climate in the centuries (even millenniums) to come
      </b>
      . So how do we do it?
    </p>
    <h2>2. Humans</h2>
    <h3 id="where-do-greenhouse-gases-come-from?">
      Where do greenhouse gases come from?
    </h3>
    <p>
      Most greenhouse gases come from burning{' '}
      <Link outward href="https://en.wikipedia.org/wiki/Fossil_fuel">
        fossil fuels
      </Link>{' '}
      (oil, gas or coal). That happens as soon as we drive a car, take a plane
      or use electricity. It also indirectly happens when we consume objects or
      foods that require a lot of energy to be produced or assembled from parts
      transported from afar.
    </p>
    <ManMadeEmissions />
    <p>
      A substantial amount of agricultural emissions comes from{' '}
      <b>cows and other livestock emitting methane</b> (CH<sub>4</sub>) as part
      of their{' '}
      <Link outward href="https://en.wikipedia.org/wiki/Enteric_fermentation">
        digestive process
      </Link>
      . Furthermore,{' '}
      <b>
        deforestation leads to less trees absorbing CO<sub>2</sub>
      </b>{' '}
      through{' '}
      <Link outward href="https://en.wikipedia.org/wiki/Photosynthesis">
        photosynthesis
      </Link>
      , and the use of <b>nitrogen-based fertilizers</b> in agriculture emits
      Nitrous Oxide (N<sub>2</sub>O), which is a greenhouse gas. Note that the
      use of fossil fuels (or electricity) for operating agricultural machines
      is not even included in agricultural emissions. By comparison, all
      road-travel globally only accounts for 12%.
    </p>
    <p>
      Finally, some 8% of global emissions relates to certain types of heavy
      industrial processes, such as kiln production for cement works, whose
      emissions are not related to the burning of fossil-fuels, and which must
      be accounted for separately.
    </p>

    <h3 id="fossil-fuels-are-used-everywhere--and-for-good-reasons">
      Fossil fuels are used everywhere, and for good reasons
    </h3>
    <p>
      Historically, the world&#8217;s energy has come from burning trees
      (biomass) for heat and tool manufacturing. However, the invention of an
      efficient steam engine by James Watt in 1784 meant humans were now able to
      convert existing{' '}
      <Link outward href="https://en.wikipedia.org/wiki/Fossil_fuel">
        fossil fuels
      </Link>{' '}
      (coal, and later oil and gas) into intensive mechanical work (lifting
      heavy objects or turning the wheels of a very heavy train for example).
      Furthermore, it enabled humans to build machines to dig up even more
      fossil fuels, enabling an exponential growth of our energy usage.
    </p>
    <p>
      The discovery of new types of fuels such as oil and gas did not replace
      the usage of existing fuels: it fuelled additional growth instead.
    </p>
    <WorldPrimaryEnergy />
    <p>
      Although wind and solar power are a decent part of newly installed energy
      production facilities nowadays (we hear about it very often in the news),
      it is still only 1% percent of global primary energy supply. In fact, we
      see that we currently still get{' '}
      <b>more than 80% of our energy from fossil fuels</b>, which surprisingly
      is <b>exactly the same as in 1980</b>: the growth of renewables has been
      matched by (or even{' '}
      <Link
        outward
        href="http://www.nationalobserver.com/2017/07/13/analysis/these-missing-charts-may-change-way-you-think-about-fossil-fuel-addiction"
      >
        outpaced by
      </Link>
      ) a similar growth of fossil fuels. How come?
    </p>
    <p>
      The answer is that fossil fuels pack an intense amount of energy in a
      small volume and small weight. Oil in particular, being light and dense,
      enabled the invention of modern transportation.
      <b>
        The energy released when burning 1&nbsp;litre of oil is equivalent to 25
        professional athletes cycling for one hour. That single litre of oil
        weighs under 1&nbsp;kg and costs 100 to 1000 times less than the
        equivalent human labour.
      </b>
      Thus it is no mystery that intensive human labour got replaced by
      machines, propelling humanity into an industrialised age where the use of
      fossil fuels{' '}
      <Link outward href="https://ourworldindata.org/employment-in-agriculture">
        displaced jobs from agriculture to the service sector
      </Link>
      .
    </p>
    <p>
      Every day an average person on Earth uses roughly{' '}
      <Link
        outward
        href="http://data.worldbank.org/indicator/EG.USE.PCAP.KG.OE"
      >
        60 kWh
      </Link>{' '}
      of energy per day. That means that{' '}
      <b>
        every day, we each have an equivalent of 15 professional cyclists
        dedicated to us to support our living standards
      </b>
      . The current quality of life that we are enjoying has been enabled by the
      efficient use of fossil fuels freeing us from intensive human labour.
    </p>
    <p>
      To get an even more concrete idea, take a look at this video to see{' '}
      <Link outward href="https://en.wikipedia.org/wiki/Robert_F%C3%B6rstemann">
        Robert Förstemann
      </Link>
      , professional track cyclist and sprint specialist, struggle to power his
      toaster:
    </p>
    <iframe
      title="ytvideo"
      width="100%"
      height="315"
      src="https://www.youtube.com/embed/S4O5voOCqAQ"
    />
    <p>
      Nowadays we don&#8217;t spend an enormous amount of our time and energy to
      power our toaster: we use electricity instead which unfortunately is still
      mostly generated by{' '}
      <Link
        outward
        href="https://en.wikipedia.org/wiki/World_energy_consumption#Energy_supply.2C_consumption_and_electricity"
      >
        burning fossil fuels
      </Link>
      .
    </p>

    <h2>3. What can we do?</h2>
    <h3 id="objective--2-tons-co2eq-per-human-per-year-by-2050">
      Objective: 2 tons CO<sub>2</sub>eq per human per year by 2050
    </h3>
    <p>
      All{' '}
      <Link outward href="https://en.wikipedia.org/wiki/Greenhouse_gas">
        greenhouse gases
      </Link>{' '}
      differ by how much radiation they trap and by how long they stay in the
      atmosphere. To be able to compare them, we convert the mass of any
      greenhouse gases into the mass of CO<sub>2</sub> that would yield an
      equivalent warming over 100 years. That unit is called{' '}
      <b>
        CO<sub>2</sub> equivalent
      </b>
      , abbreviated CO<sub>2</sub>eq. For example, 1g of N<sub>2</sub>O (nitrous
      oxide, used in fertilizers) corresponds to 300gCO<sub>2</sub>eq.
    </p>
    <p>
      The{' '}
      <Link outward href="https://en.wikipedia.org/wiki/Paris_Agreement">
        Paris climate accord
      </Link>{' '}
      has set the world an objective of limiting global warming to 2&deg;C
      objective at horizon 2100. In order to get there, models{' '}
      <Link
        outward
        href="http://uneplive.unep.org/media/docs/theme/13/EGR_2015_Technical_Report_final_version.pdf"
      >
        projecting global emission
      </Link>{' '}
      compatible with the 2&deg;C objective have been made. Using{' '}
      <Link
        outward
        href="https://en.wikipedia.org/wiki/Projections_of_population_growth"
      >
        population growth projections
      </Link>
      , we can deduce the amount CO<sub>2</sub>eq we should be allowed to emit
      per person and per year:
    </p>
    <center>
      5 tons CO<sub>2</sub>eq per person per year by 2030
      <br />
      <b>
        2 tons CO<sub>2</sub>eq per person per year by 2050
      </b>
      <br />0 tons CO<sub>2</sub>eq per person per year by 2070
    </center>
    <br />
    <p>
      This also means using only 34% of the{' '}
      <Link
        outward
        href="https://www.accenture.com/_acnmedia/PDF-11/Accenture-Strategy-Energy-Perspectives-Rougher-Seas-Ahead.pdf"
      >
        proven fossil fuel reserves
      </Link>
      , leaving the rest of it in the ground. It is highly unlikely that the
      free market, without any regulation, achieves this result.
    </p>
    <p>
      So how do we all reach that objective? Do we recycle more? Eat organic?
      Vote for more wind turbines? In this jungle of complex decisions, some
      pragmatism has to be introduced in the form of a sober quantification of
      the impact of the different choices we make.
    </p>
    <p>
      It all starts with{' '}
      <b>
        figuring out how much we&#8217;re emitting compared to the 2t objective
      </b>
      . Here&#8217;s an estimate of personal emissions depending on where you
      live:
    </p>
    <PersonalFootprint />
    <p>
      Most countries in the world are far from the 2t objective. Note that the
      more a country is populated, the more its average footprint will affect
      global emissions. For example, the United States has an average footprint
      almost identical to Canada, but due to its large population it contributes
      to 14% of global emissions (compared to only 2% for Canada). We therefore
      need to look at both population and footprint per person:
    </p>
    <EmissionsByCountry />
    <p>
      <b>80% of the world lives above the 2t objective</b>. Furthermore, half of
      the world is above the 5t objective for 2030. This is no small challenge,
      and the matter must be taken seriously.
    </p>
    <p>
      Note that even within a country, our personal footprint can vary quite a
      lot depending on our wealth and consumption habits. Therefore, it is
      important to be able to measure our footprint precisely enough to trigger
      personal behavioural change.
    </p>
    <p>
      In the next sections we&#8217;re going to give an overview of the impact
      of some daily decisions we make related to transportation, food and
      electricity. We will present comparable quantities in order to show which
      behaviour changes can have the most impact.
    </p>
    <p>
      Finally it is important to understand that{' '}
      <b>no activity is carbon-free</b>. Even the production of renewable energy
      requires the construction of wind turbines and solar panels, which will
      emit greenhouse gases during transportation, assembly, and mining of the
      necessary{' '}
      <a href="https://en.wikipedia.org/wiki/Precious_metal">rare metals</a>.
    </p>
    <p>&nbsp;</p>
    <h3 id="transportation--reduce-long-distance-travels">
      Transportation: Reduce long-distance travels
    </h3>
    <Transportation />
    <p>
      Note that even though long-distance plane trips are almost as efficient
      (per distance travelled) as conventional cars, they end up being a
      substantial part of our footprint, due to the fact that we use them for
      longer distances. If you can, travel by train, use shared mobility, or
      simply reduce distances travelled.
    </p>
    <p>
      Ultimately, in order to completely get rid of fossil fuels,{' '}
      <b>
        we will have few choices but to switch to electric transportation with
        electricity being produced carbon-free
      </b>{' '}
      (else, it would reduce all of our efforts to nothing).
    </p>
    <p>&nbsp;</p>
    <h3 id="electricity--remove-coal--gas-and-oil-power-plants">
      Electricity: remove coal, gas and oil power plants
    </h3>
    <Electricity />
    <p>
      It is crucial that we{' '}
      <b>get rid of fossil fuels for electricity generation</b>. To keep track
      of how we stand, check out the{' '}
      <Link outward href="https://app.electricitymaps.com">
        Electricity Maps App
      </Link>
      . Low-carbon strategies fall into two categories in regions where the
      terrain does not allow the installation of large-scale hydropower: nuclear
      and wind/solar. Nuclear has a waste problem, while wind and solar
      generation is variable. Variable renewables can either be balanced in time
      with storage or in space using transmission networks, or a combination of
      the two.
    </p>
    <p>
      If you&#8217;re living in a country with high renewable penetration, you
      can reduce the need for storage by{' '}
      <b>consuming electricity when the wind blows, or when the sun shines</b>.
      Even better: have your heating systems and electric car{' '}
      <Link outward href="https://www.co2signal.com">
        do it automatically
      </Link>
      .
    </p>
    <p>&nbsp;</p>
    <h3 id="food--avoid-red-meat">Food: avoid red meat</h3>
    <Food />
    <p>
      The simplest thing you can do is to avoid red meat, as cows and sheep
      require a lot of resources and emit a lot of greenhouse gases as part of
      their digestive process. It has been estimated that{' '}
      <b>
        a meat-intensive diet usually has{' '}
        <Link
          outward
          href="https://web.archive.org/web/20180303100729/http://shrinkthatfootprint.com/food-carbon-footprint-diet"
        >
          twice the footprint
        </Link>{' '}
        of a vegetarian one.
      </b>{' '}
      Note also that the footprint of transportation and packaging is less than
      one would think, as the production costs dominate.
    </p>
    <p>
      It is important to note that although doing differently might help,
      reducing your absolute level of consumption might be the only way to get
      to the 2t objective. Even a low-carbon activity can cumulate to great
      amounts when repeatedly carried out.
    </p>

    <h3 id="information-must-be-accessible-and-widely-spread">
      Information must be accessible and widely spread
    </h3>
    <p>How do we get a whole civilisation to shift consumption patterns?</p>
    <p>
      I envision of a world where the price we pay for goods and services takes
      into account long-term climate consequences (also called{' '}
      <Link outward href="https://en.wikipedia.org/wiki/Externality">
        externalities
      </Link>
      ).
    </p>
    <p>
      This would naturally <b>reward low-carbon consumption decisions</b>,
      incentivizing people to stay under the 2t yearly budget.
    </p>
  </Layout>
);

export default ClimateChange;
