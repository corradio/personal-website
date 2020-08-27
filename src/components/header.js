import React from 'react';

import { Link } from 'gatsby';

import { rhythm } from '../utils/typography';

export default () => (
  <header
    style={{
      width: '100%',
      fontSize: 'small',
      textAlign: 'center',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: rhythm(1 / 4) }}>
      <Link style={{ color: 'inherit' }} to='/'>Home</Link>
      <Link style={{ color: 'inherit' }} to='/about'>About</Link>
    </div>
    <hr />
  </header>
);
