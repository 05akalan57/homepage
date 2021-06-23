import React from "react"

import TwitterIcon from "../../assets/icons/twitter.svg"
import HeartIcon from "../../assets/icons/heart.svg"
import Copy from "../../assets/icons/copy.svg"

export default function SocialShare({ fullURL, title, onLike, like }) {
  const copyClipboard = () => {
    const el = document.createElement("textarea")
    el.value = fullURL
    el.setAttribute("readonly", "")
    el.style.position = "absolute"
    el.style.left = "-9999px"
    document.body.appendChild(el)
    el.select()
    document.execCommand("copy")
    document.body.removeChild(el)
  }

  return (
    <div className="bottom-article">
      <div className="share-post">
        <a
          href={`https://twitter.com/intent/tweet?url=${fullURL}&text=${title}`}
          target="_blank"
          rel="noreferrer"
        >
          <TwitterIcon width="21" height="21" fill="#3294da" />
        </a>
        <Copy
          onClick={copyClipboard}
          width="21"
          height="21"
          className="copy-icon"
        />
      </div>
      <div className="like-count">
        <button onClick={onLike}>
          <HeartIcon width="24" height="24" />
          {like}
        </button>
      </div>
    </div>
  )
}
