import React from "react"

import { graphql } from "gatsby"

import Layout from "../components/layout.js"
import Welcome from "../components/index/welcome.js"
import SEO from "../components/seo.js"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <section id="page">
      <Layout location={location} title={siteTitle}>
        <SEO title={"Hakkımda"} />
        <Welcome />
        <section id="page-content">
          <p>
            Merhaba ben Muhammet Emin AKALAN 19 (31.10.2001) yaşındayım.
            Amasya'da yaşıyorum ve Şuanda Sakarya Uygulamalı Bilimler
            Üniversitesi Bilgisayar Programcılığı öğrencisiyim. Sanırım yazılıma
            8.sınıfta başladım diyebilirim.
          </p>
          <p>
            Şuanlık hakkımda söylenebilecek pek bir şey yok ama inşâAllah yeni
            deneyimlerim oldukca bu sayfayı zamanla doldurmayı planlıyorum.
          </p>
          <p>
            Yazıyorum çünkü öğrendiklerimi, düşündüklerimi ve sevdiklerimi
            paylaşmayı seviyorum.
          </p>
        </section>
      </Layout>
    </section>
  )
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
