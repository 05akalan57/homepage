module.exports = {
  siteMetadata: {
    title: `Muhammet Emin AKALAN`,
    indexTitle: "Muhammet Emin AKALAN | Websitem",
    author: {
      name: `Muhammet Emin AKALAN`,
      info: "Ben Muhammet Emin AKALAN. 19 yaşındayım. Ben bir geliştiriciyim. Herhangi bir konuda yazmayı seviyorum.",
      summary: `Serbest çalışan, ön uç geliştirici, açık kaynak`,
    },
    description: `Muhammet Emin AKALAN, front-end developer, photography, blogging`,
    siteUrl: `https://homepage-demo.vercel.app/`,
    social: {
      twitter: `https://twitter.com/05akalan57`,
      github: "https://github.com/05akalan57",
      instagram: "https://instagram.com/muhammeteminakalan",
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /icons/,
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-reading-time`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-plugin-webmention`,
            options: {
              username: "homepage-demo.vercel.app",
              identity: {
                github: "05akalan57",
                twitter: "05akalan57",
              },
              mentions: true,
              pingbacks: true,
              domain: "homepage-demo.vercel.app",
              token: process.env.WEBMENTIONS_TOKEN,
            },
          },
          {
            resolve: "gatsby-remark-embed-youtube",
            options: {
              width: 800,
              ratio: 1.77,
              height: 400,
              related: false,
              noIframeBorder: true,
              urlOverrides: [
                {
                  id: "youtube",
                  embedURL: videoId =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ],
              containerClass: "embedVideo-container",
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: {
                default: "Quiet Light",
                parentSelector: { "div#dark": "Monokai Dimmed" },
              },
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 980,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Muhammet Emin AKALAN`,
        short_name: `MEA`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#e4561b`,
        display: `standalone`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
  ],
}
