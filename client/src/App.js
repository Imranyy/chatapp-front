import './App.css';
import Navbar from './Navbar';
import Home from  './Home'
import NewPost from  './NewPost'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from  './Footer'
import ErrorPage from './ErrorPage'
import About from './About';
import PostPage from './PostPage';


import {useState, UseEffect} from 'react';


function App() {

    const [posts, setPosts] = useState([
      {
        id:1,
        title:"React Js Tutorial",
        date:"June 02, 2022 11:17:52 AM",
        "body":"React, Django framework, Python"
      },
      {
        id:2,
        title:"The Presidency Title Race",
        date:"June 02, 2022 11:17:52 AM",
        "body":"Presidential Politics is "
      }
    ])


  return (
  <Router>
     <Navbar/>
    
      <Routes>
       <Route path='/' 
          element={<Home
          posts={posts}         
          />}/>
       <Route path='/about' element={<About/>}/>

       <Route path='/new' element={<NewPost/>}/>

       <Route path='/post:id' element={<PostPage 
          posts={posts}/>}
          />
       <Route path='/footer' element={<Footer/>}/>
       
       <Route path='*' element={<ErrorPage/>}/>
       
     
      </Routes> 
      </Router>
   
  
  );
}
 
export default App;
