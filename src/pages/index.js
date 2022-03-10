import * as React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Bio from "../components/bio";
import { Pill } from "../components/Pill";

const PackagesPage = ({ data, location }) => {
  const title = data.site.siteMetadata?.title || "Packages";
  const packages = data.allDpkg.nodes;

  if (packages.length === 0) {
    return (
      <Layout location={location} title={title}>
        <Seo title="All packages" />
        <p>No packages found. Add deb files to "debs"</p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={title}>
      <Seo title="All packages" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {data.allDpkg.group.map(group => (
          <div className="post-list-group">
            <h3>{group.fieldValue}</h3>
            {group.nodes.map(item => (
              <li key={item.id}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <Link to={`/package/${item.id}`} itemProp="url">
                        <span itemProp="headline">{item.Name}</span>
                      </Link>
                    </h2>
                    <div>
                      <Pill color="blue">{item.Package}</Pill>
                      <br />
                      <Pill color="orange">{item.Section}</Pill>{" "}
                      <Pill color="green">v{item.Version}</Pill>
                    </div>
                    <div>
                      <small>{item.Description}</small>
                    </div>
                  </header>
                </article>
              </li>
            ))}
          </div>
        ))}
      </ol>
    </Layout>
  );
};

export default PackagesPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allDpkg(sort: { fields: Name, order: ASC }) {
      nodes {
        id
        Name
        Section
        Filename
        Package
        Version
        Description
      }

      group(field: Section) {
        fieldValue
        nodes {
          id
          Name
          Section
          Filename
          Package
          Version
          Description
        }
      }
    }
  }
`;
