import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default function Footer() {
  const data = useStaticQuery(graphql`
    query SocialQuery {
      site {
        siteMetadata {
          social {
            twitter
            github
            instagram
          }
        }
      }
    }
  `)

  const social = data.site.siteMetadata?.social

  return (
    <footer>
      <nav id="social">
        <a href={social.twitter} target="_blank" rel="me noreferrer">
          twitter
        </a>
        <a href={social.github} target="_blank" rel="noreferrer">
          github
        </a>
        <a href={social.instagram} target="_blank" rel="noreferrer">
          instagram
        </a>
      </nav>
      <div className="email">
        Bu sitenin teması{" "}
        <a
          href="https://github.com/berat/homepage"
          target="_blank"
          rel="noreferrer"
        >
          <b>Berat Bozkurt'un</b>
        </a>{" "}
        açık kaynak projesinden alınmıştır.
      </div>
    </footer>
  )
}
