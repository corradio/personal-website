import React from 'react';

import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Post from '../components/post';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

export default ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout location={location}>
      <SEO
        title="Olivier Corradi | Blog"
      />

      <h1 style={{ marginTop: rhythm(2) }}>Blog posts</h1>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <Post
            title={title}
            key={node.fields.slug}
            to={`/blog${node.fields.slug}`}
            date={node.frontmatter.date}
            description={node.frontmatter.description || node.excerpt}
          />
        );
      })}

    </Layout>
  );
};

export const pageQuery = graphql`
  query {
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
