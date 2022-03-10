const fs = require(`fs/promises`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async options => {
  await createPostPages(options);

  const {
    getPackagesText,
    exec,
  } = require("./plugins/dpkg-source-plugin/packages");
  const packagesText = await getPackagesText("./debs");

  await fs.writeFile("./public/Packages", packagesText);
  await exec("cp -r ./debs ./public/debs");
  await exec("bzip2 -c ./public/Packages > ./public/Packages.bz2");
  await exec("gzip -c ./public/Packages > ./public/Packages.gz");

  const repo = (
    await options.graphql(`
    query Repo {
      site {
        siteMetadata {
          repo {
            name
            description
          }
        }
      }
    }
  `)
  ).data.site.siteMetadata.repo;

  await fs.writeFile(
    "./public/Release",
    `Origin: ${repo.name}
Label: ${repo.name}
Suite: stable
Version: 1.0
Codename: ios
Architectures: iphoneos-arm
Components: main
Description: ${repo.description}
`
  );
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

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
  `);
};
