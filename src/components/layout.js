import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Header from './header';
import Footer from './footer';

import { rhythm, scale } from '../utils/typography';

export default ({
  location,
  children,
}) => {
  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '680px',
        padding: `0 ${rhythm(3 / 4)}`,
      }}
    >
      <header>
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {'Home'}
        </Link>
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
};
