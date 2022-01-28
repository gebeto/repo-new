import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../../components/bio"
import Layout from "../../components/layout"
import Seo from "../../components/seo"

const Packages = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const packages = data.allDpkg.nodes;

  if (packages.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All packages" />
        <Bio />
        <p>
          No packages found. Add deb files to "debs"
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All packages" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {packages.map((item) => (
          <li key={item.id}>
            <article
              className="post-list-item"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header>
                <h2>
                  <Link to={item.id} itemProp="url">
                    <span itemProp="headline">{item.Name}</span>
                  </Link>
                </h2>
                <small>{item.Name}</small><br />
                <small>{item.Package} | v{item.Version}</small>
              </header>
            </article>
          </li>
        ))}
      </ol>
    </Layout>
  )
}

export default Packages;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allDpkg {
      nodes {
        id
        Name
        Filename
        Package
        Version
      }
    }
  }
`
