import React from 'react';
import { useState, useEffect } from 'react'
import CardTemplate from './CardTemplate';
import Grid from '@mui/material/Grid';

const CardList = (props) => {
  const [data, setData] = useState([{}])
  useEffect(() => {
    fetch(props.fetchlink).then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [props.fetchlink])
  // const numbers = [1, 2, 3, 4, 5];

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {
        (typeof data.data === 'undefined') ? (
          <p>Loading...</p>
        ) : (
          data.data.map((data, i) => {
            return (
              <Grid key = {i} item xs={12} md={6}>
                <CardTemplate key={i} nomeVariavel={data['name']} descricao={data['description']} />
              </Grid>
            )
          }
          )
        )
      }
    </Grid>
  );
}

export default CardList;