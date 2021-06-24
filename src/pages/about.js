import React from "react"

import Layout from "../components/layout.js"
import Welcome from "../components/index/welcome.js"
import SEO from "../components/seo.js"

const AboutPage = () => {
  return (
    <section id="page">
      <Layout>
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

export default AboutPage
