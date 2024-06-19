import React, { useState } from 'react'
import {Container,Button} from '@mui/material'
import ComboBox from './ComboBox';
import '../Assets/HomePage.css'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon  from '@mui/icons-material/Search';

const InputR = ({Name,setFetchedData ,setLoading }) => {
    const[text,setText]=useState('');
    
   

     function handleChange(event){
            setText(event.target.value);
    
        }

        async function handleClick(){
            setLoading(true);
            if(Name==="Name"){
            try{const res=await fetch(`https://api.openbrewerydb.org/v1/breweries?by_name=${text}&per_page=10`);
            const result=await res.json();
            setFetchedData(result);
            if(result){
                setLoading(false)
            }
            console.log(result);}
            catch(e){
                    console.log(e);
                    setLoading(false)
            }
            }
            else if(Name==="Type"){
                try{const res=await fetch(`https://api.openbrewerydb.org/v1/breweries?by_type=${text}&per_page=3`);
                    const result=await res.json();
                    setFetchedData(result);
                    if(result){
                        setLoading(false)
                    }
                    console.log(result);
            }
            catch(e){
                    console.log(e);
                    setLoading(false)
            }
                }else{
                try{const res=await fetch(`https://api.openbrewerydb.org/v1/breweries?by_city=${text}&per_page=10`);
                const result=await res.json();
                setFetchedData(result);
                if(result){
                    setLoading(false)
                }
                console.log(result);}
                catch(e){
                            console.log(e);
                            setLoading(false)
                }
            }




            setText('');
        }


  return (
    <div className='inp-sec'>
   

        {(Name!=="Type")?(<TextField id="outlined-basic" label={Name} variant="outlined" onChange={handleChange} value={text}  />):(<ComboBox setText={setText}/>)}
        <IconButton color="secondary" variant="contained" aria-label="delete" size="large" onClick={handleClick}>
            <SearchIcon fontSize="inherit" />
            </IconButton>
        
       
    </div>
  )
}

export default InputR