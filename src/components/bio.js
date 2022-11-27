import React from 'react';

import { StaticQuery, Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Container, Row, Col } from 'react-grid-system';

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
      Hi there, I&apos;m Olivier
    </h1>
    <Container style={{ padding: 0 }}>
      <Row justify="center" align="center" nogutter>
        <Col xs={7} sm={3}>
          <div
            style={{
              borderRadius: '30%',
              overflow: 'hidden',
              margin: rhythm(1 / 2),
            }}
          >
            <ProfileImage />
          </div>
        </Col>
        <Col sm={9} style={{ marginBottom: rhythm(1 / 2), marginTop: rhythm(1 / 2) }}>
          I&apos;m a statistician, data scientist and entrepreneur focussed on finding scalable solutions to climate change.

          I created and founded <a href="https://electricitymaps.com">Electricity Maps</a> early 2016, where I now dedicate most of my time as CEO.
        </Col>
      </Row>
    </Container>
    <p>
      I also spend time researching how complex system self-organise in order to understand the dynamics of evolution and the emergence of collective behaviour.
    </p>
    <p>
      Feel free to connect with me on <a href={`https://twitter.com/${siteMetadata.social.twitter}`}>twitter</a> or <a href={`https://linkedin.com/in/${siteMetadata.social.linkedin}`}>linkedIn</a>.
    </p>
  </div>
);
