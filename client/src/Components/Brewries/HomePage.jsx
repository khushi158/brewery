// Import React and necessary components
import React, { useContext, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputR from './Input';
import Listings from './Listings';
import '../Assets/HomePage.css';
import SwitchesGroup from './SwitchesGroup';
import { Loader, Placeholder } from 'rsuite';
import { AuthContext, useAuth } from '../../Contexts/Authcontext';
import { useNavigate } from 'react-router';
import { supabase } from '../Authentication/app';
// HomePage component
const HomePage = () => {
  // State for managing search options and fetched data
  const [searchBar, setSearchBar] = useState({ Name: true ,Type:false ,city: false});
  const [fetchedData, setFetchedData] = useState([]);
  const [loading,setLoading]=useState(false);
  // Function to handle radio button clicks

  

  const navigator=useNavigate();
  const {isAuthenticated,setIsAuthenticated}=useContext(AuthContext);
      const{login,logout} =useAuth();
  

  useEffect(()=>{

      if(JSON.parse(localStorage.getItem("user"))==null)navigator('/login');


  },[])



  return (
    <Container className="home-page-container">
      {" "}
      {/* Use Container for better styling */}
      <div className="radioHolder">
        <SwitchesGroup state={searchBar} setState={setSearchBar} />
      </div>
      <div className="search-input">
        {searchBar.Name && (
          <InputR
            Name="Name"
            setFetchedData={setFetchedData}
            setLoading={setLoading}
          />
        )}
        {searchBar.Type && (
          <InputR
            Name="Type"
            setFetchedData={setFetchedData}
            setLoading={setLoading}
          />
        )}
        {searchBar.City && (
          <InputR
            Name="City"
            setFetchedData={setFetchedData}
            setLoading={setLoading}
          />
        )}
      </div>
      {loading && (
        <div>
          <Placeholder.Paragraph rows={8} />
          <Loader backdrop content="loading..." vertical />
        </div>
      )}
      <Container className="search-result">
        {fetchedData.length > 0 ? (
          <Listings data={fetchedData} />
        ) : !loading ? (
          <h2>search something</h2>
        ) : null // You might want to render something else or nothing when loading is true
        }
      </Container>
    </Container>
  );
};

export default HomePage;
