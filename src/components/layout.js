import React from 'react';
import styled from 'styled-components';

import Header from './header';
import Footer from './footer';

import { rhythm, scale } from '../utils/typography';

export default ({
  children,
}) => (
  <div
    style={{
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '680px',
      padding: `0 ${rhythm(3 / 4)}`,
    }}
  >
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);
