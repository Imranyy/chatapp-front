import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar=()=>{
  const [name,setName]=useState('');
  const[number,setNumber]=useState('');
  const[password,setPassword]=useState('');
  const handleRegister=async(e)=>{
    e.preventDefault();
    try {
      const registerForm=document.querySelector('.register')
      const url=''
      const register=await fetch(url,{
        method:'POST',
        body:JSON.stringify({
          name:name,
          number:number,
          password:password
        }),
        headers:{
          'Content-Type':'application/json'
        }
      })
      registerForm.reset()
      const parseRes=await register.json();

    } catch (error) {
      console.log(error.message)
    }
  }
  const handleLogin=async(e)=>{
    e.preventDefault();
    try {
      const loginForm=document.querySelector('.login')
      const url=''
      const login=await fetch(url,{
        method:'POST',
        body:JSON.stringify({
          name:name,
          password:password
        }),
        headers:{
          'Content-Type':'application/json'
        }
      })
      loginForm.reset()
      const parseRes=await login.json()
      localStorage.setItem('name',parseRes.name);

    } catch (error) {
      console.log(error.message)
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
    return(
        <>
        <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand">My Chat Room</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Dashboard</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body" style={{fontFamily:'monospace'}}>
              <div className='regform'>
              <p >Register</p>
              <form className="register" onSubmit={handleRegister}>
                <input className="form-control " type="text" placeholder="Enter your name" onChange={(e)=>{setName(e.target.value)}} required/><br/>
                <input type='number' className='form-control' placeholder='Whatsapp Number (+2547xxxxxxxx)' onChange={(e)=>{setNumber(e.target.value)}} required/><br/>
              <input type='password' className='form-control' placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} required/>  <br/>
                <button className="btn btn-success" >Register</button>
                <a onClick={tologin} style={{float:'right', cursor:'pointer'}}>I have an account</a>
              </form>
              </div>
              <br/>
              
              <div className='loginform'>
              <p>Login</p>
              <form className="login" onSubmit={handleLogin}>
                <input className="form-control " type="text" placeholder="Enter your name" onChange={(e)=>{setName(e.target.value)}} required/><br/>
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
          </div>
        </div>
      </nav>
</>
    )
}
export default NavBar;