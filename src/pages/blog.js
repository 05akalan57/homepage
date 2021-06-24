import React, { useState } from "react"

import { graphql } from "gatsby"

import Layout from "../components/layout.js"
import SEO from "../components/seo.js"
import BlogList from "../components/index/blogList.js"

const BlogPage = ({ data }) => {
  const [isFilter, setFilter] = useState("Tümü")

  const posts = data.blog.nodes
  const categories = ["Tümü", "Yazılım", "Kişisel"]

  const filterByCategory =
    isFilter && isFilter !== "Tümü"
      ? posts.filter(item => item.frontmatter.category.indexOf(isFilter) + 1)
      : posts

  if (posts.length === 0) {
    return (
      <Layout>
        <SEO title={"Blog"} />
        <p>
          Blog yazısı bulunamadı. "content/blog"a (veya
          "gatsby-source-filesystem" eklentisi gatsby-config.js için
          belirttiğiniz dizine) işaretleme gönderileri ekleyin
        </p>
      </Layout>
    )
  }

  return (
    <section id="page">
      <Layout>
        <SEO title={"Blog"} />
        <section id="blog-page">
          <section className="category-filter">
            <h4>Kategoriler : </h4>
            <ul>
              {categories.map((item, index) => (
                <li
                  aria-hidden="true"
                  className={isFilter === item ? "active" : null}
                  onClick={e => setFilter(item)}
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="all-post-list">
            <BlogList posts={filterByCategory} isPost />
          </section>
        </section>
      </Layout>
    </section>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query {
    blog: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "//blog//" } }
    ) {
      nodes {
        excerpt(pruneLength: 230)
        fields {
          slug
          readingTime {
            text
          }
        }
        frontmatter {
          date
          category
          title
        }
      }
    }
  }
`
