import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";

const DescriptionWrapper = styled.div`
  display: flex;
  margin-bottom: var(--spacing-16);

  .bio p {
    margin-bottom: var(--spacing-0);
  }

  .bio-avatar {
    margin-right: var(--spacing-4);
    margin-bottom: var(--spacing-0);
    min-width: 50px;
    border-radius: 100%;
    mask-image: radial-gradient(circle, white 100%, black 100%);
    overflow: hidden;
  }
`;

export const Description = () => {
  const data = useStaticQuery<{
    site: {
      siteMetadata: {
        author: {
          name?: string;
          summary?: string;
        };
        social: {
          twitter: string;
        };
      };
    };
  }>(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `);

  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;

  return (
    <DescriptionWrapper>
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.jpg"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <p>
          Created by <strong>{author.name}</strong> {author?.summary || null}
          {` `}
          <a href={`https://twitter.com/${social?.twitter || ``}`}>
            You should follow them on Twitter
          </a>
        </p>
      )}
    </DescriptionWrapper>
  );
};
