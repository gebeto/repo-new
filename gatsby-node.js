const path = require(`path`)
const fs = require(`fs/promises`);
const { createFilePath } = require(`gatsby-source-filesystem`)


const createPostPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}


const createPackagesPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const packageTemplate = path.resolve(`./src/templates/package.js`);
  const result = await graphql(
    `
      {
        allDpkg {
          nodes {
            id
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const packages = result.data.allDpkg.nodes;

  if (packages.length > 0) {
    packages.forEach(package => {
      createPage({
        path: `/package/${package.id}`,
        component: packageTemplate,
        context: {
          package: package.id
        },
      })
    })
  }
}


exports.createPages = async (options) => {
  await createPostPages(options);
  await createPackagesPages(options);

  const { getPackagesText, exec } = require('./plugins/dpkg-source-plugin/packages');
  const packagesText = await getPackagesText('./debs');

  await fs.writeFile('./public/Packages', packagesText);
  await exec('bzip2 -c ./public/Packages > ./public/Packages.bz2');
  await exec('gzip -c ./public/Packages > ./public/Packages.gz');
  await fs.writeFile('./public/Release', `Origin: gebeto-new
Label: gebeto-new
Suite: stable
Version: 1.0
Codename: ios
Architectures: iphoneos-arm
Components: main
Description: gebeto repository
`);
}


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}


exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
