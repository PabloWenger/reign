import React from 'react';
import banner from './banner.jpg';
import Container from '@material-ui/core/Container';

export default function Banner() {



  return (
     <Container className={'banner bottom-left'}>
      <img src={banner}/>
      <h1>HN Feeds</h1>
      <h3>{'we <3 hacker news!'}</h3>
      </Container>
  );
}
