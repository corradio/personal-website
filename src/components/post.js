import React from 'react';
import { Link } from 'gatsby';

import { rhythm } from '../utils/typography';

export default ({
  title, href, to, date, description, key,
}) => (
  <article key={key}>
    <header>
      <h3 style={{ marginBottom: 0 }}>
        {to ? (
          <Link style={{ boxShadow: 'none' }} to={to}>
            {title}
          </Link>
        ) : null}
        {href ? (
          <a style={{ boxShadow: 'none' }} href={href}>
            {title}
          </a>
        ) : null}
      </h3>
      {date ? <small>{date}</small> : null}
    </header>
    <section style={{ marginTop: rhythm(1 / 4) }}>
      <p
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    </section>
  </article>
);