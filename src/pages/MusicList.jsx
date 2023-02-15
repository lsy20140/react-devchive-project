import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useYoutubeApi } from '../context/YoutubeApiContext';
import PlaylistItem from '../components/PlaylistItem';

export default function MusicList() {
  const {keyword} = '';
  const { youtube } = useYoutubeApi();
  
  const {isLoading, error, data: playlist} = useQuery(
    ['playlist', keyword], ()=> youtube.search(keyword), {staleTime: 1000 * 60 * 1}
  )

  return (
  <div className='page_container'>
    <h3>코딩할 때 듣기 좋은 음악</h3>
    {isLoading && <p>Loading중</p>}
    {error && <p>Error 발생</p>}
    {playlist && (
      <ul>
        {playlist.map((music, i) => (
          <PlaylistItem key={i} music={music}/>
        ))}
      </ul>
    )}
  </div>

  )
}
