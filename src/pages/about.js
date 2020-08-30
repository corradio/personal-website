import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

export default ({ data, location }) => {
  return (
    <Layout location={location}>
      <SEO
        title="Olivier Corradi | About"
      />

      <h1>About me</h1>
      <p>
        Born in 1987 in France, I started coding aged 12 by building websites and small desktop applications in PHP 3 and Visual Basic 6.
        Wanted to fully embrace my Danish roots (my mother is Danish), I then moved to Denmark after high-school to study Mathematics at DTU.
        To make ends meet, I installed and managed servers and computers of the uni&apos;s library.
        In my spare time, I lead a Warcraft III team which surprisingly enough ended up being ranked at a European level.
        To this day it remains one of my favorite strategy games as it combines real-time micro-management skills with longer strategical planning abilities, packed in short intense games (15-30min).
      </p>
      <p>
        Initially triggered by a fascination of ants, I wrote a paper based on my thesis about the <a href="https://core.ac.uk/download/pdf/192402918.pdf">emergence of collective behavior of pedestrians</a> as a first attempt to understand evolution from a physical perspective.
        I then spent two years in France at École Centrale Paris studying engineering, science and management, before heading back to Denmark to finalise my Master around Applied Statistics.
        My key research topic was about integrating large shares of fluctuating renewable energy onto the electricity grid, which led me to write a paper based on my thesis about <a href="http://henrikmadsen.org/wp-content/uploads/2014/05/Journal_article_-_2013_-_Controlling_Electricity_Consumption_by_Forecasting_its_Response_to_Varying_Prices.pdf">controlling electricity consumption by forecasting its response to varying prices</a>.
        As a student job, I spent time at IBM Denmark learning about business development in the Energy & Utilities sector.
      </p>
      <p>
        I then spent some time at IBM Research in Zürich implementing my research, before leaving to Google where I worked partly on anti-abuse systems, and partly on internal energy projects.
        Dissatisfied with the slowness of large corporations, I took a year off and ended up joining a French AI startup called Snips.
        Snips started out as an research lab building an AI capable of <a href="https://medium.com/snips-ai/how-we-re-creating-a-privacy-preserving-ai-for-your-smartphone-83665c90f0d5">inferring your personal knowledge graph</a> without compromising your privacy.
        As first employee, I was fortunate enough to have the challenge to hire a team of 30 data scientists and engineers over the next two years, alongside building the initial versions of the infrastructure and AI models that powered the Snips technology.
        In an urge to get back to the energy world, and in the wake of the climate emergency, I left Snips after two years (it went on to become <a href="https://www.theverge.com/2019/11/21/20975607/sonos-buys-snips-ai-voice-assistant-privacy.">acquired by Sonos</a> in 2019).
      </p>
      <p>
        In 2016, given more pressing energy and climate situation, I discovered both an immense urge but also a large opportunity in centralising and visualising carbon data.
        With the mission of organising and making widely available the world&apos;s carbon information, I created <a href="https://tmrow.com">Tomorrow</a>, with the <a href="https://electricitymap.org">electricityMap</a> as first initiative.
      </p>

      <h1 style={{ marginTop: rhythm(2) }}>Favorite resources</h1>
      This is a section containing my favorite resources, listed in the order that I discovered them (newest first).

      <h2 style={{ marginTop: rhythm(1) }}>Articles</h2>
      <ul>
        <li><a href="https://dothemath.ucsd.edu/2012/04/economist-meets-physicist/">Exponential Economist Meets Finite Physicist</a></li>
      </ul>

      <h2 style={{ marginTop: rhythm(1) }}>Papers</h2>
      <ul>
        <li><a href="https://www.sciencedirect.com/science/article/pii/0895717794901880">Life as a manifestation of the second law of thermodynamics</a></li>
      </ul>


      <h2 style={{ marginTop: rhythm(1) }}>Books</h2>
      <ul>
        {[
          {
            author: 'Matthieu Auzanneau',
            name: 'Or noir. La grande Histoire du pétrole',
            href: 'https://www.amazon.com/noir-grande-histoire-p%C3%A9trole/dp/2707167010',
            lang: 'fr',
          },
          {
            author: 'Eric D. Schneider',
            name: 'Into the Cool: Energy Flow, Thermodynamics, and Life',
            href: 'https://www.amazon.com/Into-Cool-Energy-Flow-Thermodynamics/dp/0226739376',
            lang: 'en',
          },
          {
            author: 'Erwin Schrödinger',
            name: 'What is life?',
            href: 'https://www.amazon.com/What-Life-Autobiographical-Sketches-Classics/dp/1107604664',
            lang: 'en',
          },
          {
            author: 'Ilya Prigogine',
            name: 'Order Out of Chaos',
            href: 'https://www.amazon.com/Order-Out-Chaos-Ilya-Prigogine/dp/0553343637',
            lang: 'en',
          },
          {
            author: 'François Roddier',
            name: 'Thermodynamique de l\'évolution',
            href: 'https://www.amazon.com/Thermodynamique-l%C3%A9volution-essai-thermo-bio-sociologie/dp/2917141328',
            lang: 'fr',
          },
          {
            author: 'Jacques Monod',
            name: 'Le Hasard et la Necessite',
            href: 'https://www.amazon.com/Hasard-Necessite-philosophie-naturelle-biologie/dp/2757844482',
            lang: 'fr',
          },
        ].map(d => (
          <li><a href={d.href}>{`${d.name} (${d.author}) ${d.lang === 'fr' ? ' (French)' : ''}`}</a></li>
        ))}
      </ul>

    </Layout>
  );
};
