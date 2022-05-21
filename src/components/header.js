import React from 'react';

import { Link } from 'gatsby';

import { rhythm } from '../utils/typography';

const PAGES = {
  'Home': '/',
  'Blog': '/blog/',
  'Projects': '/projects/',
  'Resources': '/resources/',
};

export default () => (
  <header
    style={{
      width: '100%',
      textAlign: 'center',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: rhythm(1 / 4) }}>
      { Object.entries(PAGES).map(([k, v]) => (
        <Link style={{ color: 'inherit' }} partiallyActive={v.includes('blog')} activeStyle={{ fontWeight: 'bold' }} to={v}>{k}</Link>
      )) }
    </div>
    <hr />
  </header>
);
