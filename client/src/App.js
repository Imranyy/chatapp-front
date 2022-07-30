import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import {Toaster} from 'react-hot-toast'; 

function App() {
  
  
  return (
 <>
 <Toaster/>
   <Router>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='*' element={<NotFound/>}/>
    </Routes> 
  </Router>
 </>
  );
}
 
export default App;
