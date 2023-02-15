import React from 'react'
import styles from '../styles/playlistItem.module.css'

export default function PlaylistItem({music}) {
  const {title, channelTitle} = music.snippet
  return (
    <div className={styles.list_item}>
      <iframe id="player" type="text/html" className={styles.iframe}
          src={`http://www.youtube.com/embed/${music.id.videoId}`}
          title={title}
          autoPlay={true}/>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.channelTitle}>{channelTitle}</p>
      </div>
    </div>
  )
}
