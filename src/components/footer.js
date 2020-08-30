import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

import { rhythm } from '../utils/typography';
import theme from '../utils/themeconstants';

export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            social { twitter, linkedin, github, googlescholar }
          }
        }
      }
    `}
    render={({ site }) => (
      <footer
        style={{
          width: '100%',
          fontSize: 'small',
          textAlign: 'center',
          paddingBottom: rhythm(1 / 4),
        }}
      >
        © Olivier Corradi&nbsp;
        <span>
          {site.siteMetadata.social.twitter && (
            <a href={`https://twitter.com/${site.siteMetadata.social.twitter}`} aria-label="twitter link">
              <FontAwesomeIcon size="lg" color={theme.colors.gray} icon={faTwitter} />
            </a>
          )}
          &nbsp;
          {site.siteMetadata.social.linkedin && (
            <a href={`https://www.linkedin.com/in/${site.siteMetadata.social.linkedin}`} aria-label="linkedin link">
              <FontAwesomeIcon size="lg" color={theme.colors.gray} icon={faLinkedin} />
            </a>
          )}
          &nbsp;
          {site.siteMetadata.social.github && (
            <a href={`https://github.com/${site.siteMetadata.social.github}`} aria-label="github link">
              <FontAwesomeIcon size="lg" color={theme.colors.gray} icon={faGithub} />
            </a>
          )}
          &nbsp;
          {site.siteMetadata.social.googlescholar && (
            <a href={`https://scholar.google.com/citations?user=${site.siteMetadata.social.googlescholar}`} aria-label="googlescholar link">
              <FontAwesomeIcon size="lg" color={theme.colors.gray} icon={faGraduationCap} />
            </a>
          )}
        </span>
      </footer>
    )}
  />
);
