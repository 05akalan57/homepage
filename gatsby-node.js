const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        site {
          siteMetadata {
            siteUrl
          }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
          nodes {
            id
            frontmatter {
              title
              description
              date
            }
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
      `Blog gönderileriniz yüklenirken bir hata oluştu`,
      result.errors
    )
    return
  }

  const all = result.data.allMarkdownRemark.nodes

  if (all.length > 0) {
    all.forEach((post, index) => {
      var previousPostId = index === 0 ? null : all[index - 1].id
      var nextPostId = index === all.length - 1 ? null : all[index + 1].id
      createPage({
        path: "blog" + post.fields.slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug: post.fields.slug,
          previousPostId,
          nextPostId,
          permalink: `${result.data.site.siteMetadata.siteUrl}blog${post.fields.slug}`,
        },
      })
    })
  }
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
