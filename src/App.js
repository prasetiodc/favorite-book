import { useEffect, useState } from 'react';
import { Search } from '@mui/icons-material';
import { Grid, InputAdornment, TextField, Button, Divider, CircularProgress } from '@mui/material';
import './App.css';

import PlaceholderImage from './assets/placeholder-search.png';

import { GoogleAPI, API } from './config/API';
import CardResult from './components/CardResult';
import CardFavorite from './components/CardFavorite';
import Swal from 'sweetalert2';

function App() {
  const [VisibleImageSearch, setVisibleImageSearch] = useState(true);
  const [Keyword, setKeyword] = useState('');
  const [LoadingSearch, setLoadingSearch] = useState(false);
  const [LoadingFavorite, setLoadingFavorite] = useState(false);
  const [DataSearch, setDataSearch] = useState([]);
  const [DataFavorite, setDataFavorite] = useState([]);

  useEffect(() => {
    fetchDataFavorite()
  }, []);

  const search = async () => {
    setLoadingSearch(true)
    try {
      if (Keyword) {
        setVisibleImageSearch(false)
        let { data } = await GoogleAPI.get(`/books/v1/volumes?q=${Keyword}`)
        setDataSearch(data.items)
      }
    } catch (err) {
      Swal.fire({
        title: "Search failed",
        icon: "warning",
      });
    }
    setLoadingSearch(false)
  }

  const fetchDataFavorite = async () => {
    setLoadingFavorite(true)
    try {
      let { data } = await API.get('/favorite')

      setDataFavorite(data.data)
    } catch (Err) {
      Swal.fire({ title: 'Fetch data favorite failed', icon: 'error' })
    }
    setLoadingFavorite(false)
  }

  const addFavorite = (data) => {
    setDataFavorite([data, ...DataFavorite])
  }

  const deleteFavorite = async (id_deleted) => {
    let newList = await DataFavorite.filter(el => el.id !== id_deleted)
    setDataFavorite(newList)
  }

  return (
    <Grid container className="App">
      {/* LEFT SIDE */}
      <Grid xs={12} sm={6} md={4} className="ContainerLeft">
        <Grid className="ContainerSearch">
          <TextField
            placeholder='Keyword'
            className="TextSearch"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.keyCode === 13 && search()}
            size="small"
            fullWidth
          />
          <Button variant='contained' className='buttonSearch' onClick={search} >Search</Button>
        </Grid>
        <Divider />
        <Grid className="ContainerResults">
          {
            VisibleImageSearch
              ? <div className='center'>
                <img src={PlaceholderImage} className='ImageSearch' alt="placeholder-search" />
              </div>
              : LoadingSearch
                ? <div className='center'>
                  <CircularProgress className='LoadingSearch' />
                </div>
                : <>
                  <b>Result :</b>
                  <Grid className='Result'>
                    {
                      DataSearch.length === 0
                        ? <p>No Data</p>
                        : DataSearch.map((data, index) =>
                          <CardResult data={data} key={`search-${index}`} addFavorite={addFavorite} listFavorite={DataFavorite} />)
                    }
                  </Grid>
                </>
          }
        </Grid>
      </Grid>

      {/* RIGHT SIDE */}
      <Grid xs={12} sm={6} md={8} className="ContainerRight">
        <h1>Favorite Books</h1>
        {
          LoadingFavorite
            ? <div className='center'>
              <CircularProgress className='LoadingSearch' />
            </div>
            : DataFavorite.length === 0
              ? <p>No Data</p>
              : <Grid container>
                {
                  DataFavorite.map((data, index) =>
                    <CardFavorite data={data} key={`search-${index}`} deleteFavorite={deleteFavorite} />)
                }
              </Grid>
        }

      </Grid>
    </Grid>
  );
}

export default App;
