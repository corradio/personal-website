import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Grid, { DEFAULT_CONFIG } from '../components/interactivegrid';
import { rhythm } from '../utils/typography';

import NorthVideo from '../videos/north.mp4';

export default ({ data, location }) => (
  <Layout location={location}>
    <SEO
      title="Olivier Corradi | Projects"
    />

    <h1 style={{ marginTop: rhythm(2) }}>Projects</h1>
    This is a section containing projects I have worked on.

    <h2 style={{ marginTop: rhythm(1) }}>Scope 2 widget (2022)</h2>
    It can be tricky to understand scope 2 carbon accounting rules.
    A guide was written (<a href="https://www.electricitymaps.com/guides/accounting-guide">Understanding Electricity Scope 2 Attribution Rules</a>), and a small widget was made as a complement.
    Feel free to play around with it below:

    <Grid config={DEFAULT_CONFIG} attributionRuleKey="marketBased" style={{ padding: '2em' }} />

    <h2 style={{ marginTop: rhythm(1) }}>footprintMap: CO₂ emissions of the global economy (2021)</h2>
    <p>
      footprintMap is a visualisation of the CO₂ emissions of the global economy.
      It uses the electricityMap visualisation engine to
      visualise various indicators about the global econonomy: GDP, population, emissions and energy supply.
      Check it out <a href="https://footprintmap.org">here</a>, or contribute to it <a href="https://github.com/corradio/footprintmap/">here</a>.
    </p>
    <p>
      <center>
        <a href="https://footprintmap.org">
          <img src="https://footprintmap.org/images/social_image.png" alt="footprintmap.org" />
        </a>
      </center>
    </p>

    <h2 style={{ marginTop: rhythm(2) }}>The North app: automating your personal carbon footprint (2019-2020)</h2>
    <p>
      With the team at Tomorrow, we worked on the North app, which was envisioned as a way to automatically track and calculate the carbon footprint of your life.
      It worked by connecting to apps you already used in order to track the activities you perform in your daily life.
      For example, by connecting and parsing your emails, the app was able to detect all plane and train tickets purchased.
      By connecting to your bank, the app was able to assess all items purchased (e.g. groceries or clothing).
      Finally, by connecting to your smart meter or electric vehicle, the app was able to assess the time at which you used electricity.
    </p>
    <p>
      As the app had access to a significant amount of sensitive content, it was <i>private by design</i>:
      all data processing was done on the phone, and it didn&apos;t upload any information onto our servers.
    </p>
    <p>
      All the carbon models and the integrations were <a href="https://github.com/tmrowco/northapp-contrib">open-sourced</a> in order to create a community helping us to cover the whole ecosystem of potential integrations, and to enable trust in the carbon models.
    </p>
    <p>
      North was discontinued in August 2020 (read more <a href="https://www.tmrow.com/blog/sunsetting-north/">here</a>).
    </p>
    <p>
      <center>
        <video width="250" height="445" controls>
          <source src={NorthVideo} type="video/mp4" />
        </video>
      </center>
    </p>

    <h2 style={{ marginTop: rhythm(2) }}>brick: a build tool for mono-repositories (2019-2020)</h2>
    <p>
      Larger organisations such as Google, Facebook and Twitter have adopted the mono-repository approach as they have the means to maintain such an infrastructure,
      but unfortunately solutions for smaller organisations are limited.
      At electricityMap, we wanted to embrace the mono-repository structure.
      brick was therefore built as a simple build tool for mono-repositories.
      Read more about it <a href="https://electricitymap.org/blog/brick-a-build-tool-for-mono-repositories/">here</a> and contribute to it <a href="https://github.com/electricitymap/brick">here</a>.
    </p>

  </Layout>
);
