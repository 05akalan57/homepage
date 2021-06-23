import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Welcome = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 1000, height: 1000, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.author
  const avatar = data?.avatar?.childImageSharp?.fixed
  const { twitter, github } = data.site.siteMetadata?.social

  return (
    <section className="welcome">
      {avatar && (
        <Image
          fixed={avatar}
          width="175"
          height="175"
          alt={author.name || ``}
          className="bio-avatar"
        />
      )}
      <h2>Selam, ben Muhammet</h2>
      <p className="display-font">
        front-end developer olarak çalışıyorum. Ayrıca yararlı bulduğum
        içerikleri ve deneyimlerimi{" "}
        <a href={twitter} rel="noreferrer" target="_blank">
          twitter
        </a>
        'da, açık kaynak projelerimi{" "}
        <a href={github} rel="noreferrer" target="_blank">
          github
        </a>
        'da paylaşıyorum.
      </p>
    </section>
  )
}

export default Welcome
