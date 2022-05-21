import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
/* This makes sure that the css from fontawesome is loaded before the icon is displayed */
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function SEO({
  description,
  lang = 'en',
  meta = [],
  keywords = [],
  title,
  previewImageURL,
  url,
  canonicalLink,
}) {
  return (
    <StaticQuery
      query={graphql`
      query DefaultSEOQuery {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `}
      render={(data) => {
        const metaDescription = description || data.site.siteMetadata.description;
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            link={canonicalLink
              ? [{ rel: 'canonical', key: canonicalLink, href: canonicalLink }]
              : []
            }
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:title',
                content: title || data.site.siteMetadata.title,
              },
              {
                property: 'og:description',
                content: metaDescription || data.site.siteMetadata.description,
              },
              {
                property: 'og:image',
                name: 'image',
                content: previewImageURL, // || `${data.site.siteMetadata.siteUrl}/social.jpg`,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                property: 'og:url',
                content: url || data.site.siteMetadata.siteUrl,
              },
              {
                name: 'twitter:card',
                content: 'summary_large_image',
              },
              {
                name: 'twitter:creator',
                content: data.site.siteMetadata.author,
              },
              {
                name: 'twitter:title',
                content: title,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
              {
                name: 'twitter:image',
                content: previewImageURL, // || `${data.site.siteMetadata.siteUrl}/social.jpg`,
              },
              {
                name: 'twitter:site',
                content: '@corradio',
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                    name: 'keywords',
                    content: keywords.join(', '),
                  }
                  : [],
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
}

export default SEO;
