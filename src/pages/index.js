import React from 'react';

import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

export default ({ data, location }) => {
  const { siteMetadata } = data.site;
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout location={location}>
      <SEO
        title="Olivier Corradi | Home"
      />
      <Bio siteMetadata={siteMetadata} />

      <h1 style={{ marginTop: rhythm(2) }}>Selected publications</h1>
      <ul>
        <li>Pragmatic guide to climate change</li>
      </ul>

      <h1 style={{ marginTop: rhythm(2) }}>Blog posts</h1>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={`blog${node.fields.slug}`}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        );
      })}
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        social { twitter, linkedin }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
