import React from 'react';

import { graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import Post from '../components/post';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const YoutubeVideo = ({ src }) => (
  // eslint-disable-next-line jsx-a11y/iframe-has-title
  <iframe
    width="100%"
    src={src}
    frameBorder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
);

export default ({ data, location }) => {
  const { siteMetadata } = data.site;
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout location={location}>
      <SEO
        title="Olivier Corradi | Home"
      />
      <Bio siteMetadata={siteMetadata} />

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

      <h1 style={{ marginTop: rhythm(2) }}>Selected publications</h1>
      <Post
        title="How to trace back the origin of electricity"
        href="https://www.tmrow.com/blog/flow-tracing/"
        date="April 19, 2021"
      />
      {null && <Post
        title="Real-time carbon accounting method for the European electricity markets"
        href="https://www.sciencedirect.com/science/article/pii/S2211467X19300549"
        date="November 01, 2019"
      />}
      <Post
        title="Why green electricity contracts fail to deliver green electricity"
        href="https://www.tmrow.com/blog/green-electricity-contracts/"
        date="September 03, 2018"
      />
      <Post
        title="Estimating the marginal carbon intensity of electricity with machine learning"
        href="https://www.tmrow.com/blog/marginal-carbon-intensity-of-electricity-with-machine-learning/"
        date="July 03, 2018"
      />
      <Post
        title="Pragmatic guide to climate change"
        href="https://tmrow.com/climatechange/"
        date="2016 (regularly revised)"
      />
      <Post
        title="Controlling Electricity Consumption by Forecasting its Response to Varying Prices"
        href="http://henrikmadsen.org/wp-content/uploads/2014/05/Journal_article_-_2013_-_Controlling_Electricity_Consumption_by_Forecasting_its_Response_to_Varying_Prices.pdf"
        date="February, 2013"
      />
      <Post
        title="Equation-Free Detection and Continuation of a Hopf Bifurcation Point in a Particle Model of Pedestrian Flow"
        href="https://core.ac.uk/download/pdf/192402918.pdf"
        date="September 05, 2012"
      />

      <h1 style={{ marginTop: rhythm(2) }}>Selected videos</h1>
      <YoutubeVideo src="https://www.youtube.com/embed/UR3K4CokeHA" />
      <YoutubeVideo src="https://www.youtube.com/embed/PAelZb2ZYwI" />
      <YoutubeVideo src="https://www.youtube.com/embed/cl33WNjZCO4" />
      <YoutubeVideo src="https://www.youtube.com/embed/8jrD91gDvSk" />
      <YoutubeVideo src="https://www.youtube.com/embed/AZ3td3fHnWM" />

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
