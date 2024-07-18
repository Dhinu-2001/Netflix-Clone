import React, { useEffect, useState } from 'react';
import './RowPost.css';
import axios from '../../axios';
import YouTube from 'react-youtube';
import {API_KEY,imageURL} from '../../Constants/constants';

function RowPost(props) {
  const [movie, setMovie] = useState([]);
  const [urlId, setUrlId] = useState();
  useEffect(()=>{
    axios.get(props.url).then((response) =>{
      setMovie(response.data.results)
    })
  }, [])

  function handleTrailer(id){
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data)
      if(response.data.results.length!=0){
        setUrlId(response.data.results[0])
      }else{
        alert('Trailer not available.')
      }
    })
  }

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    }
  }
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>

          {movie.map((obj)=>
              <img onClick={()=> handleTrailer(obj.id)} className={props.isSmall? 'smallPoster':'poster'} src={`${obj? imageURL+obj.backdrop_path:''} `} alt="poster" />
          )}
        </div>
       {urlId && <YouTube videoId={urlId.key} opts={opts}  />  }
    </div>
  )
}

export default RowPost