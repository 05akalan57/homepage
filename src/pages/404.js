import React from "react"

import Layout from "../components/layout.js"
import SEO from "../components/seo.js"

const NotFoundPage = () => {
  return (
    <section id="page">
      <Layout>
        <SEO title="404: Bulunamadı" />
        <section id="not-found">
          <h1>
            404: Bulunamadı{" "}
            <span role="img" aria-label="emoji">
              😔
            </span>
          </h1>
          <p>Yolunu kaybettin, doğru yerde misin? Kontrol et.</p>
        </section>
      </Layout>
    </section>
  )
}

export default NotFoundPage
