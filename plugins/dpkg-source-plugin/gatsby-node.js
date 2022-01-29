/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */

const { getPackages } = require('./packages');

const DPKG_NODE_TYPE = `Dpkg`;

exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin")

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions
  const packages = await getPackages('./debs');
  const data = {
    packages: packages.map((package, index) => ({
      id: index + 1,
      ...package,
    })),
  }
  // loop through data and create Gatsby nodes
  data.packages.forEach(package =>
    createNode({
      ...package,
      // id: createNodeId(`${DPKG_NODE_TYPE}-${package.id}`),
      id: package.Package.replace(/\./g, '-'),
      internal: {
        type: DPKG_NODE_TYPE,
        // content: JSON.stringify(package),
        contentDigest: createContentDigest(package),
      },
    })
  )
  return
}
