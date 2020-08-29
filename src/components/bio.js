import React from 'react';

import { StaticQuery, Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { rhythm } from '../utils/typography';

const ProfileImage = () => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "profile.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    `}
    render={data => <Img fluid={data.placeholderImage.childImageSharp.fluid} />}
  />
);

export default ({ siteMetadata }) => (
  <div>
    <h1>
      Hi there, I&apos;m Olivier Corradi
    </h1>
    <div
      style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: rhythm(1),
      }}
    >
      <div
        style={{
          width: '100%', borderRadius: '30%', overflow: 'hidden', marginRight: rhythm(1 / 2),
        }}
      >
        <ProfileImage />
      </div>
      <div>
        I&apos;m a data scientist and entrepreneur focussed on finding scalable solutions to climate change.

        I created the <a href="https://electricitymap.org">electricityMap</a> early 2016, and later the same year founded <a href="https://tmrow.com">Tomorrow</a>, where I still dedicate most of my time as CEO.
      </div>
    </div>
    <p>
      I also spend time researching how complex system self-organise in order to understand the dynamics of evolution and the emergence of collective behaviour.
    </p>
    <p>
      Read more <Link to="/about">about me</Link>, or connect with me on <a href={`https://twitter.com/${siteMetadata.social.twitter}`}>twitter</a> or <a href={`https://linkedin.com/in/${siteMetadata.social.linkedin}`}>linkedIn</a>.
    </p>
  </div>
);
