import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { rhythm } from '../utils/typography';

const Tag = styled.span`
  background-color: #e0ddff;
  color: black;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: small;
  margin-right: 3px;
`;

export default ({
  title, href, to, date, description, key, tags,
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
      <div>
        {date ? <small>{date}</small> : null}
        &nbsp;
        {(tags || []).map(tag => (
          <Tag>{tag}</Tag>
        ))}
      </div>
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
