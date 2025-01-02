import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from '../../Contexts/cardData';
import { Container,Button } from '@mui/material';
import Reviews from './Reviews';
import StarRating from './StarRating';
import '../Assets/Reviews.css'
import axios from 'axios';
import Stars from './Stars';




const Individual = () => {
    const[brewery,setBrewery]=useState({});
    const[data,setData]=useState([]);
    const[rev,setRev]=useState([]);
    const{cardId}=useContext(ContextData);
    // const cardId="63baab9a-b561-4eff-8619-f95290a61b77";
    const[text,setText]=useState('');
    const[starValue,setStarValue]=useState(0);


  useEffect(()=>{
    async function getData(){
        const res=await fetch(`https://api.openbrewerydb.org/v1/breweries/${cardId}`);
        const response=await res.json();
        setBrewery(response)
        
    }
    async function getMongoData(){
        const res=await fetch(`${process.env.REACT_APP_API_URL}/api/todos`);
       
        const todos=await res.json();
        setData(todos.filter((e)=>e.todo===cardId));
        console.log(todos + "Sourabh");
        
     
        for(let i=0;i<todos.length;i++){
          if(todos[i].todo===cardId){
            setRev(todos[i].reviews);
          }
        }
        
      }
    getMongoData();
    getData();

  },[]);

  


  async function handleClick() {
    console.log(text);
    let z;
    for(let i=0;i<data.length;i++){
    if(data[i].todo===cardId){
      z=i;
      break;
    }
  }
  
    // Check if the todo already exists in MongoDB
  
    if (rev.length > 0) {
      // If the todo exists, update the reviews
      setRev((prevRev) => [...prevRev, {text,starValue}]);
  
      try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/todos/${data[z]._id}`, {
          reviews: [...rev,  {text,starValue}], // Use the updated state directly here
        });
  
        // Update the state with the response received from the server
        // setRev(res.data.reviews);
  
        console.log(res.data);
  
        // You may want to handle the response accordingly
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    } else {
      // If the todo doesn't exist, create a new one
      setRev([...rev,  {text,starValue}]);
  
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/todos`, {
          todo: cardId,
          reviews: [ {text,starValue}],
        });
  
        console.log(res.data);
  
        // You may want to handle the response accordingly
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  
    setText('');
  }
  





        return (
            <div className='header1'>
            <div style={styles.container}>
              <h2 style={styles.name}>{brewery.name}</h2>
              <div style={styles.address}>
                {brewery.street && <p>{brewery.street}</p>}
                {brewery.city && brewery.state && brewery.postal_code && (
                  <p>
                    {brewery.city}, {brewery.state} {brewery.postal_code}
                  </p>
                )}
              </div>
              <p style={styles.type}>{brewery.brewery_type}</p>
              {brewery.phone && <p style={styles.phone}>Phone: {brewery.phone}</p>}
              {brewery.website_url && (
                <p style={styles.website}>
                  Website: <a href={brewery.website_url}>{brewery.website_url}</a>
                </p>
              )}
            </div>
            <Container className='review-container'>
                            <StarRating setStarValue={setStarValue}/>
                  <div className='rc-2'><input
                        className="review-input"
                        value={text}
                        type="text"
                        placeholder="Add review..."
                        onChange={(e) => {
                        setText(e.target.value);
                        
                        }}
                    />
                   {(text==="")?<Button disabled >Fill review</Button>
                        :<Button variant="contained" onClick={handleClick}>Add Review</Button>}
                        </div>
                    
            </Container>
            
            <Container className='review-container childrenReview'>
            <h1 className='reviewssss'>Reviews {"😀"}:</h1>
              {rev && rev.length>0 && rev.map((e)=>(
              
                <p className='rc-item'>
                   
                    <h3>{e.text}</h3>
                    
                        <Stars data={e.starValue}/>
                      
                </p>
            ))}</Container>
                    
            </div>
          );
        };
        
        const styles = {
          container: {
            maxWidth: '400px',
            margin: 'auto',
            background:'white',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          },
          name: {
            fontSize: '24px',
            marginBottom: '10px',
          },
          address: {
            marginBottom: '10px',
          },
          type: {
            color: '#333',
            fontSize: '18px',
            marginBottom: '10px',
          },
          phone: {
            marginBottom: '10px',
          },
          website: {
            marginBottom: '10px',
          },
        };

export default Individual;