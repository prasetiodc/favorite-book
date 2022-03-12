import React, { useState } from 'react';
import { Button, Card, Grid } from '@mui/material';
import './style.css';
import { API } from '../config/API';
import Swal from 'sweetalert2';
import PlaceholderImage from '../assets/placeholder-image.png';
import ModalBook from './ModalBook';

export default function CardFavorite({ data, deleteFavorite }) {
  const [OpenModal, setOpenModal] = useState(false);

  const _deleteFavorite = async () => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await API.delete(`/favorite/${data.id}`)

          deleteFavorite(data.id)
          Swal.fire({ title: 'Delete Favorite success!', icon: 'success' })
        }
      })

    } catch (err) {
      Swal.fire({ title: 'Delete Favorite faild', titleText: 'please try again!', icon: 'error' })
    }
  }

  return (
    <Grid sm={12} md={6} lg={4} className='ContainerFavorite'>
      <Card className='CardFavorite'>
        <div style={{ margin: 0, cursor: 'pointer' }} onClick={() => setOpenModal(true)}>
          <div className='HeaderCardFavorite'>
            <h3 style={{ margin: 0 }}>{data.title.toUpperCase()}</h3>
          </div>
          {
            data.thumbnail
              ? <img src={data.thumbnail} style={{ width: 180, height: 250, marginBottom: 10 }} alt={`thumbnail-${data.title}`} />
              : <div className='PlaceholderImage'>
                <img src={PlaceholderImage} style={{ width: 180, height: 180, }} alt={`thumbnail-${data.title}`} /></div>
          }
        </div>
        <Button fullWidth variant='contained' onClick={_deleteFavorite} color="error">Delete Favorite</Button>
      </Card>

      {
        OpenModal && <ModalBook data={data} open={OpenModal} close={() => setOpenModal(false)} />
      }
    </Grid >
  )
}
