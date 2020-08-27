import React from 'react';

import { Link } from 'gatsby';
import { faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import theme from '../utils/themeconstants';

export default ({ siteMetadata }) => (
  <div>
    <h1>
      Hi there, I'm Olivier Corradi
    </h1>
    <p>
      I'm a data scientist and entrepreneur focussed on finding scalable solutions to climate change.

      I created the <a href="https://electricitymap.org">electricityMap</a> early 2016, and founded a startup called <a href="https://tmrow.com">Tomorrow</a> later the same year, where I still dedicate most of my time as CEO.
    </p>
    <p>
      I also spend time researching how complex system self-organise in order to understand the dynamics of evolution and the emergence of collective behaviour.
    </p>
    <p>
      Read more <Link to="/about">about me</Link>, or connect with me on <a href={`https://twitter.com/${siteMetadata.social.twitter}`}>twitter</a> or <a href={`https://linkedin.com/in/${siteMetadata.social.linkedin}`}>linkedIn</a>.
    </p>
  </div>
);
