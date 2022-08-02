import NavBar from "./NavBar";
import io from 'socket.io-client';
import img from '../img2.png'
import { useState,useEffect } from "react";

const socket=io.connect('https://serve-chat-app.herokuapp.com')
 const Home=()=>{
    const[output,setOutput]=useState('');
    const [output1,setOutput1]=useState('')
    const [message,setMessage]=useState('');
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const form=document.querySelector('.d-flex')
        try {
                socket.emit('chat',{
                pic:localStorage.getItem('pic'),
                name:localStorage.getItem('name'),
                message:message
            })
            form.reset()
        } catch (error) {
            console.log(error.message)
        }
    }

        useEffect(()=>{
            //get recent chats
            socket.on('chat',data=>{
                console.log(data)
                setOutput1(data)
                })
            //getting chats
        socket.on('output',res=>{
            setOutput(res)
            console.log(res)
            
       },[socket])
        })
    return(
        <>
        <NavBar/>
        <div className="container chat-window">
        {output?output.map(res=>(
            <div key={res._id} className="output">
                <img src={res.pic?res.pic:img} className="avatar"  alt='.' width='40' height='40' style={{borderRadius:'20px'}}/><p style={{marginLeft:'50px',marginTop:'-45px'}}>  {res.message}</p><br/>
            </div>
                )):'No chats'}
   
                
                <div className="output1">
                    <img src={output1.pic?output1.pic:img} className="avatar"  alt='.' width='40' height='40' style={{borderRadius:'20px'}}/><p style={{marginLeft:'50px',marginTop:'-45px'}}>  {output1.message?output1.message:'Text something😉😉'}</p><br/>
                 </div>
                 

                
        </div>
        
        <div className="container logged-in" style={{display:'none'}}> 
        <form className="d-flex" onSubmit={handleSubmit}>
        <input className="form-control message-input" type="text" placeholder="Message" onChange={(e)=>{setMessage(e.target.value)}} autoFocus required/>
        <button className="btn btn-success"><i className="material-icons">send</i></button>
        </form>
        </div> 
        </>
    )
 }
 export default Home;