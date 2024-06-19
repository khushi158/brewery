import React, { useContext } from 'react'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ContextData } from '../../Contexts/cardData';
import { useNavigate } from 'react-router';
import '../Assets/HomePage.css'




const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  

const ListingCard = ({data}) => {
//     Brewery name
// b. Brewery Address
// c. Phone number
// d. Web site URL
// e. Current rating (rating based on point no.4)
// f. State, City
const{setState}=useContext(ContextData);    
const navigate=useNavigate();
function handleClick(){
        console.log(data);
        setState(data.id);
        navigate("/info");
    }


  return (
    <Card onClick={handleClick} variant="outlined" sx={{ minWidth: 275 }} className='lc-2'>
    <CardContent>
      <Typography sx={{ fontSize: 19 }} color="text.primary" gutterBottom>
        {data.name}
      </Typography>
     
      <Typography variant="body2">
      <Typography variant="h6" component="div">
        {data.address_1}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {data.phone}
      </Typography>
        {data.website}
        <br />
        {data.city}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" href={`${data.website_url}`}>Learn More</Button>
    </CardActions>
  </Card>
  )
}

export default ListingCard