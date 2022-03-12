import { Divider, Fade, Grid, Modal } from '@mui/material'
import React from 'react'
import PlaceholderImage from '../assets/placeholder-image.png';
import StarRatings from 'react-star-ratings/build/star-ratings';

export default function ModalBook({ data, open, close }) {
  return (
    <Modal
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      open={open}
      onClose={close}
    >
      <Fade in={open}>
        <Grid style={{
          backgroundColor: 'white',
          width: 750,
          maxWidth: '90%',
          maxHeight: '90%',
          padding: '20px 30px 40px 30px',
          borderRadius: 5,
          overflowX:'auto'
        }}>
          <div className='TitleModal'>
            <h2 style={{ margin: '0px' }}>{data.title.toUpperCase()}</h2>
            <Grid style={{ display: 'flex', alignItems: 'center' }}>
              <b style={{ fontSize: 20, marginRight: 3 }}>{data.rating || 0}</b>
              <StarRatings
                rating={1}
                starRatedColor="gold"
                numberOfStars={1}
                starDimension={25}
                starSpacing={0}
              />
            </Grid>
          </div>
          <Divider />
          <Grid container pt={2}>
            <Grid xs={12} sm={4} style={{ textAlign: 'center' }}>
              {
                data.thumbnail
                  ? <img src={data.thumbnail} style={{ width: '100%', maxWidth: '230px', marginBottom: 10, cursor: 'pointer' }} alt={`thumbnail-${data.title}`} />
                  : <div className='PlaceholderImage'>
                    <img src={PlaceholderImage} style={{ width: '100%' }} alt={`thumbnail-${data.title}`} /></div>
              }
            </Grid>
            <Grid xs={12} sm={8} paddingX={2}>
              <b>Authors :</b>
              <p style={{ marginBottom: '10px' }}>{data.authors}</p>

              <b>Description :</b>
              <p>{data.description || '-'}</p>

            </Grid>
          </Grid>

        </Grid>
      </Fade>
    </Modal>
  )
}
