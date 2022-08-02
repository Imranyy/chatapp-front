import { useState,useEffect } from "react";
import toast from "react-hot-toast";
import img from "../img.png";
import { Link} from "react-router-dom";
import { projectStorage,ref,getDownloadURL,uploadBytesResumable} from '../FirebaseConfig/FirebaseConfig';
const NavBar=()=>{
  const [users,setUsers]=useState('')
  const[isUi,setIsUi]=useState(false)
  //setupUI for logged in and logged out admins
 
  const checkUI=async()=>{
    try {
      const url='https://serve-chat-app.herokuapp.com/api/verify'
      const response=await fetch(url,{
        method:'GET',
        headers:{
          authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      const parseRes= await response.json();
      parseRes===true ? setIsUi(true): setIsUi(false)
    } catch (err) {
      toast.error('Register or Login to you account!');
      setIsUi(false);
      console.log(err.message);
    }
  }
  const getUsers=async()=>{
    try {
      const url='https://serve-chat-app.herokuapp.com/api/users';
      const response=await fetch(url,{
        method:'GET'
      })
      const parseRes=await response.json();
      setUsers(parseRes)
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(()=>{
    getUsers()
    checkUI()
  },[]);
  const loggedinLink=document.querySelectorAll('.logged-in')
  const loggedoutLink=document.querySelectorAll('.logged-out')
  if(isUi){
    loggedinLink.forEach(item=>item.style.display='block')
    loggedoutLink.forEach(item=>item.style.display='none')
  }else{
    loggedinLink.forEach(item=>item.style.display='none')
    loggedoutLink.forEach(item=>item.style.display='block')
  }

  const [name,setName]=useState('');
  const[number,setNumber]=useState('');
  const[password,setPassword]=useState('');
  const handleRegister=async(e)=>{
    e.preventDefault();
    try {
      preloader()
      const registerForm=document.querySelector('.register')
      const url='https://serve-chat-app.herokuapp.com/api/register'
      const register=await fetch(url,{
        method:'POST',
        body:JSON.stringify({
          pic:localStorage.getItem('pic'),
          name:name,
          number:number,
          password:password
        }),
        headers:{
          'Content-Type':'application/json'
        }
      })
      preloaderoff()
      registerForm.reset()
      const parseRes=await register.json();
      if(parseRes.token){
        localStorage.setItem('id',parseRes._id);
        localStorage.setItem('pic',parseRes.pic);
        localStorage.setItem('token',parseRes.token);
        localStorage.setItem('name',parseRes.name);
        localStorage.setItem('number',parseRes.number);
        setIsUi(true)
        toast.success('success register')
      }else{
        preloaderoff()
        registerForm.reset()
        toast.error(parseRes)
      }
      } catch (err) {
        preloaderoff()
        const registerForm=document.querySelector('.register')
        registerForm.reset()
        toast.error('Try again☠☠')
        console.log(err.message)
      }
  }
  const handleLogin=async(e)=>{
    e.preventDefault();
    try {
      preloader()
      const loginForm=document.querySelector('.login')
      const url='https://serve-chat-app.herokuapp.com/api/login'
      const login=await fetch(url,{
        method:'POST',
        body:JSON.stringify({
          number:number,
          password:password
        }),
        headers:{
          'Content-Type':'application/json'
        }
      })
      preloaderoff()
      loginForm.reset()
      const parseRes=await login.json()
      if(parseRes.token){
        localStorage.setItem('id',parseRes._id);
        localStorage.setItem('pic',parseRes.pic);
        localStorage.setItem('token',parseRes.token);
        localStorage.setItem('name',parseRes.name);
        localStorage.setItem('number',parseRes.number);
        setIsUi(true)
        toast.success('success login')
      }else{
        preloaderoff()
        loginForm.reset()
        toast.error(parseRes)
      }
      } catch (err) {
        preloaderoff()
        const loginForm=document.querySelector('.login')
        loginForm.reset()
        toast.error('Try again!')
        console.log(err.message)
      }
  }
  
  const toreg=()=>{
    const reg=document.querySelector('.regform')
    const login=document.querySelector('.loginform')
    reg.classList.add('open')
    login.classList.add('close')
  }
  const tologin=()=>{
    const reg=document.querySelector('.regform')
    const login=document.querySelector('.loginform')
    login.classList.remove('close');
    reg.classList.remove('open')
  }
  const logOut=async()=>{
    try {
      preloader()
      localStorage.removeItem('id')
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('number')
      localStorage.removeItem('pic')
      preloaderoff()
      setIsUi(false)
      toast.error("logout successfully")
  } catch (err) {
    preloaderoff()
    toast.error('Try again😂😂')
      console.log(err.message)
  }
  }
  //upload profile
  const [error,setError]=useState(null);
  const [file,setFile]=useState(null);
      const types=['image/png', 'image/jpeg'];

        const changeHandler=(e)=>{
          let selected=e.target.files[0]
          if(selected&&types.includes(selected.type)){
              setFile(selected)
              setError('')
              //uploading image to storage
              const storageRef=ref(projectStorage,selected.name);
              const uploadTask = uploadBytesResumable(storageRef, selected);
              uploadTask.on('state_changed',
               async()=>{
                  try {
                    preloader()
                       await getDownloadURL(storageRef).then((url)=>{
                        console.log(url);
                        localStorage.setItem('pic',url);
                       })
                       const url=`https://serve-chat-app.herokuapp.com/api/${localStorage.getItem('id')}`
                         const update=localStorage.getItem('pic')
                         fetch(url,{
                             method:'PATCH',
                             body:JSON.stringify({
                               pic:update
                             }),
                               headers:{
                                 'Content-Type':'application/json'
                               }
                         })
                         preloaderoff();
                         toast.success('profile updated successfully😊😊');
                  } catch (error) {
                    preloaderoff()
                    toast.error('failed to update profile☠☠')
                      console.log(error)
                  }
                       })
                       
          }else{
              setFile(null);
              setError('Please select an image file(png or jpeg)')
          }
        }
   //preloader
   const preloader=()=>{
    const loader=document.querySelector('.preload');
    loader.style.display='block';
  }
  const preloaderoff=()=>{
    const loader=document.querySelector('.preload');
    loader.style.display='none'; 
  }
  const pic=localStorage.getItem('pic');
    return(
        <>
        
        <nav className="navbar navbar-dark bg-dark fixed-top"> 
        <div className="container-fluid">
          <Link to='/' className="navbar-brand logged-out" style={{display:'none'}}>My Chat Room</Link>
          <Link to='/' className="navbar-brand logged-in" style={{display:'none',fontFamily:'monospace'}}><img src={pic?pic:img} className="avatar" alt="avatar" width='40' height='40' style={{borderRadius:'20px', color:'GrayText'}}/> {localStorage.getItem('name')}</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel" style={{overflowY:'auto'}}><div className="preload"></div>
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel" style={{color:"GrayText"}}>Dashboard</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body logged-out" style={{fontFamily:'monospace',display:'none'}}>
              <div className='regform'>
              <p >Register</p>
              <form className="register" onSubmit={handleRegister}>
                <input className="form-control " type="text" placeholder="Enter your name" onChange={(e)=>{setName(e.target.value)}} required/><br/>
                <input type='number' className='form-control' placeholder='Whatsapp Number (07xxxxxxxx)' onChange={(e)=>{setNumber(e.target.value)}} required/><br/>
              <input type='password' className='form-control' placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} required/>  <br/>
                <button className="btn btn-success" >Register</button>
                <a onClick={tologin} style={{float:'right', cursor:'pointer'}}>I have an account</a>
              </form>
              </div>
              <br/>
              
              <div className='loginform'>
              <p>Login</p>
              <form className="login" onSubmit={handleLogin}>
                <input className="form-control " type="number" placeholder="Whatsapp number" onChange={(e)=>{setNumber(e.target.value)}} required/><br/>
                <input type='password' className='form-control' placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} required/>  <br/>
                <button className="btn btn-success" >Login</button>
                <a onClick={toreg} style={{float:'right', cursor:'pointer'}}>Register Now</a>
              </form>
              </div>

              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link to='/' className="nav-link active" aria-current="page" >Home</Link>
                </li>
              </ul>
            </div>
           <div className="logged-in" style={{display:'none',width:'40%',marginLeft:'30%'}}>
            <label >
                <input type="file" onChange={changeHandler}/>
                <span>  
                    <img src={pic?pic:img} className="avatar circle img" alt='' height="120" width='120'/>
                <br/>
                Update Profile pic:
                </span>
            </label>
            <div className="img-response">
                {error&&<div className='error'>{error}</div>}
                {file&&<div>{file.name}</div>}
            </div>
            <div style={{fontFamily:'monospace'}}>
              <p style={{color:'GrayText'}}>Name</p>
              <p style={{marginTop:'-18px'}}>{localStorage.getItem('name')}</p>
              <p style={{color:'GrayText'}}>Phone</p>
              <p style={{marginTop:'-18px'}}>{localStorage.getItem('number')}</p>
            </div>
            
            </div><br/><br/>

            <div className="logged-in" style={{display:'none',marginLeft:'50px'}}>
              <h5 style={{fontFamily:'monospace', color:'GrayText'}}>Active Users</h5>
            {users?users.map(user=>(
                <><div key={user._id} style={{fontFamily:'monospace'}}>
                  <img src={user.pic} alt='' className="avatar"  width='40' height='40' style={{borderRadius:'20px'}}/>  {user.name}
                  </div><br/></>
              )):'No Active Users'}
            </div><br/>
           

              <button onClick={logOut} className="btn btn-success logged-in" style={{display:'none',width:'40%',marginLeft:'30%'}} >Log Out☠</button>
              <br/><br/>
          </div>
        </div>
      </nav>
</>
    )
}
export default NavBar;