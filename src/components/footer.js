import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

import theme from '../utils/themeconstants';

export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            social { twitter, linkedin, github }
          }
        }
      }
    `}
    render={({ site }) => (
      <footer>
        {site.siteMetadata.social.github && (
          <a href={`https://github.com/${site.siteMetadata.social.github}`} aria-label="github link">
            <FontAwesomeIcon size="lg" color={theme.colors.gray} icon={faGithub} />
          </a>
        )}
        {site.siteMetadata.social.twitter && (
          <a href={`https://twitter.com/${site.siteMetadata.social.twitter}`} aria-label="twitter link">
            <FontAwesomeIcon size="lg" color={theme.colors.gray} icon={faTwitter} />
          </a>
        )}
        {site.siteMetadata.social.linkedin && (
          <a href={`https://www.linkedin.com/in/${site.siteMetadata.social.linkedin}`} aria-label="linkedin link">
            <FontAwesomeIcon size="lg" color={theme.colors.gray} icon={faLinkedin} />
          </a>
        )}
      </footer>
    )}
  />
);
