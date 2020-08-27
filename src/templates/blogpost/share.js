import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import theme from '../../utils/themeconstants';

const Share = ({
  url, title, siteMetadata, size, style, padding,
}) => (
  <div style={style}>
    <TwitterShareButton
      url={url}
      title={title}
      via={siteMetadata.social.twitter}
      style={{ color: theme.colors.gray, marginRight: padding || 10 }}
    >
      <FontAwesomeIcon icon={faTwitter} size={size || '1x'} />
    </TwitterShareButton>
    <FacebookShareButton
      url={url}
      style={{ color: theme.colors.gray, marginRight: padding || 10 }}
    >
      <FontAwesomeIcon icon={faFacebookSquare} size={size || '1x'} />
    </FacebookShareButton>
    <LinkedinShareButton
      url={url}
      title={title}
      style={{ color: theme.colors.gray, marginRight: padding || 10 }}
    >
      <FontAwesomeIcon icon={faLinkedin} size={size || '1x'} />
    </LinkedinShareButton>
  </div>
);

export default Share;
