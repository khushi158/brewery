import React from 'react'
import ListingCard from './ListingCard';
import { Container } from '@mui/material';
import '../Assets/HomePage.css'


const Listings = ({data}) => {
  return (
    <div>
        <div className='myListings' id='style-13'>{
            
            data.map((e,i)=>(<ListingCard key={i} data={e}/>))
            
            
            }</div>

    </div>
  )
}

export default Listings