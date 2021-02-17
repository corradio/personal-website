/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-coy.css';

import { rhythm } from '../../utils/typography';
import theme from '../../utils/themeconstants';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Share from './share';

const Section = styled.section`
  .gatsby-highlight pre[class*="language-"] {
    font-size: 70%;
  }
  h2,h3 {
    margin-top: ${rhythm(2)};
    margin-bottom: ${rhythm(1 / 2)};
  }
  h2 {
    font-family: "Lato Black", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif !important;
  }
  p.figcaption {
    color: ${theme.colors.gray};
    font-size: 70%;
    text-align: center;
  }
  a {
    color: ${theme.colors.black};
    text-decoration: none;
    text-decoration-style: solid;
    background-image: url('data:image/svg+xml;utf8,<svg preserveAspectRatio="none" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="0" x2="1" y2="1" stroke="rgba(41, 41, 41, 1)" /></svg>');
    background-position-x: 0px;
    background-position-y: calc(1em + 1px);
    background-repeat: repeat-x;
    background-size: 1px 1px;
  }
`;

export default ({ data, location, pageContext }) => {
  const post = data.markdownRemark;
  const { siteMetadata } = data.site;
  const { siteUrl } = siteMetadata;

  const url = `${siteUrl}${location.pathname}`;
  const { title } = post.frontmatter;

  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={title}>
      <SEO
        title={`${title} - Olivier Corradi's blog`}
        description={post.frontmatter.description || post.excerpt}
        previewImageURL={`${siteUrl}${post.frontmatter.image.publicURL}`}
        canonicalLink={post.frontmatter.originalURL}
      />
      <article>
        <header style={{ marginBottom: rhythm(1) }}>
          <h1 style={{ marginBottom: rhythm(1 / 4) }}>{post.frontmatter.title}</h1>
          <div style={{ color: theme.colors.gray, fontSize: 'small' }}>
            <a href={url}>{post.frontmatter.date}</a>
            {' · '}
            {post.fields.readingTime.text}
          </div>
        </header>

        <Section dangerouslySetInnerHTML={{ __html: post.html }} />

        <footer style={{ marginTop: rhythm(2) }}>
          <div>
            <small>Share this article on&nbsp;</small>
            <Share
              url={url}
              title={title}
              siteMetadata={siteMetadata}
              style={{ display: 'inline' }}
            />
          </div>
          <hr style={{ marginTop: rhythm(1 / 4) }} />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`/blog${previous.fields.slug}/`} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/blog${next.fields.slug}/`} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
        social { twitter, linkedin }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
        readingTime {
          text
        }
      }
      frontmatter {
        title
        originalURL
        date(formatString: "MMMM DD, YYYY")
        description
        image {
          publicURL
          childImageSharp {
            fluid(quality: 80, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  }
`;
