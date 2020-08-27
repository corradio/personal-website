const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ page, graphql, actions }) => {
  const { createPage } = actions;
  // See https://github.com/gatsbyjs/gatsby-starter-blog/blob/master/gatsby-node.js
  const blogPost = path.resolve('./src/templates/blogpost/index.js');

  const result = await graphql(
    `
      {
        blogs: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
        tagsGroup: allMarkdownRemark(
          limit: 1000
        ) {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create Blog
  const blogPosts = result.data.blogs.edges;
  const postsPerPage = 12;
  const numPages = Math.ceil(blogPosts.length / postsPerPage);

  blogPosts.forEach((post, index) => {
    const previous = index === blogPosts.length - 1 ? null : blogPosts[index + 1].node;
    const next = index === 0 ? null : blogPosts[index - 1].node;
    createPage({
      path: `blog${post.node.fields.slug}`,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });

  // Create tag pages
  // const tags = result.data.tagsGroup.group;
  // tags.forEach((tag) => {
  //   const numTagPages = Math.ceil(tag.totalCount / postsPerPage);
  //   Array.from({ length: numTagPages }).forEach((_, i) => {
  //     createPage({
  //       path: i === 0 ? `blog/tags/${tag.fieldValue.toLowerCase()}/` : `blog/tags/${tag.fieldValue.toLowerCase()}/${i + 1}`,
  //       component: path.resolve('./src/templates/blog.js'),
  //       context: {
  //         limit: postsPerPage,
  //         skip: i * postsPerPage,
  //         numPages,
  //         currentPage: i + 1,
  //         tag: [tag.fieldValue],
  //       },
  //     });
  //   });
  // });

  // Create blog-list pages
  // Array.from({ length: numPages }).forEach((_, i) => {
  //   createPage({
  //     path: i === 0 ? '/blog' : `/blog/${i + 1}`,
  //     component: path.resolve('./src/templates/blog.js'),
  //     context: {
  //       limit: postsPerPage,
  //       skip: i * postsPerPage,
  //       numPages,
  //       currentPage: i + 1,
  //       tag: tags.map(tag => tag.fieldValue),
  //     },
  //   });
  // });
};


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    // const parent = getNode(node.parent);
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};
