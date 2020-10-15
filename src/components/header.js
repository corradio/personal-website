import React from 'react';

import { Link } from 'gatsby';

import { rhythm } from '../utils/typography';

const PAGES = {
  'Home': '/',
  'About': '/about/',
};

export default () => (
  <header
    style={{
      width: '100%',
      fontSize: 'small',
      textAlign: 'center',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: rhythm(1 / 4) }}>
    { Object.entries(PAGES).map(([k, v]) => (
      <Link style={{ color: 'inherit' }} partiallyActive={true} activeStyle={{ fontWeight: 'bold' }} to={v}>{k}</Link>
    )) }
    </div>
    <hr />
  </header>
);
