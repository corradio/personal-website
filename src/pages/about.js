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

      <h1 style={{ marginTop: rhythm(2) }}>Favorites ⭐️</h1>
      This is a section containing my favorite resources, listed in the order that I discovered them (newest first).

      <h2 style={{ marginTop: rhythm(1) }}>Articles 📝</h2>
      <ul>
        <li><a href="https://dothemath.ucsd.edu/2012/04/economist-meets-physicist/">Exponential Economist Meets Finite Physicist</a></li>
      </ul>

      <h2 style={{ marginTop: rhythm(1) }}>Papers 📝</h2>
      <ul>
        <li><a href="https://www.sciencedirect.com/science/article/pii/0895717794901880">Life as a manifestation of the second law of thermodynamics</a></li>
      </ul>


      <h2 style={{ marginTop: rhythm(1) }}>Books 📚</h2>
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
        ].map(d => (
          <li><a href={d.href}>{`${d.name} (${d.author}) ${d.lang === 'fr' ? ' (French)' : ''}`}</a></li>
        ))}
      </ul>

    </Layout>
  );
};
