import React, { useState, useEffect } from 'react';
import { Button, Card } from '@mui/material';
import './style.css';
import StarRatings from 'react-star-ratings/build/star-ratings';
import { API } from '../config/API';
import Swal from 'sweetalert2';
import PlaceholderImage from '../assets/placeholder-image.png';

export default function CardResult({ data, addFavorite, listFavorite }) {
  const [HasFavorited, setHasFavorited] = useState(false);

  useEffect(() => {
    function checkFavorite() {
      let check = listFavorite.find(el => el.id === data.id)
      if (check) setHasFavorited(true)
    }

    checkFavorite()
  }, [data.id, listFavorite]);

  const _addFavorite = async () => {
    try {
      let newData = {
        id: data.id,
        title: data.volumeInfo?.title,
        description: data.volumeInfo?.description,
        thumbnail: data.volumeInfo?.imageLinks?.smallThumbnail,
        authors: data.volumeInfo?.authors?.join(','),
        rating: data.volumeInfo?.averageRating,
      }

      await API.post('/favorite', newData)

      addFavorite(newData)
      setHasFavorited(true)
      Swal.fire({ title: 'Add to Favorite success!', icon: 'success' })

    } catch (err) {
      Swal.fire({ title: 'Add to Favorite faild', titleText: 'please try again!', icon: 'error' })
    }
  }

  return (
    <Card className='CardResult' >
        {
          data.volumeInfo?.imageLinks?.smallThumbnail 
          ? <img src={data.volumeInfo?.imageLinks?.smallThumbnail} style={{ width: 100, height: 150 }} alt={`thumbnail-${data.volumeInfo?.title}`} />
          : <img src={PlaceholderImage} style={{ width: 100, height: 100 }} alt={`thumbnail-${data.volumeInfo?.title}`} />
        }       
        
      <div className='bodyResult'>
        <b>Title :</b>
        <p style={{ marginBottom: '5px' }}>{data.volumeInfo?.title}</p>
        <b>Author :</b>
        <p style={{ marginBottom: '5px' }}>{data.volumeInfo?.authors?.join(',') || '-'}</p>
        <b>Rating :</b><br />
        <StarRatings
          rating={data.volumeInfo?.averageRating || 0}
          starRatedColor="gold"
          numberOfStars={5}
          name='rating'
          starDimension={20}
          starSpacing={0}
        /><br />
        <div className='right'>
          {
            !HasFavorited && <Button variant='contained' size="small" onClick={_addFavorite}>Add Favorite</Button>
          }
        </div>
      </div>
    </Card>
  )
}
