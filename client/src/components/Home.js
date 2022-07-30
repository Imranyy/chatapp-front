import NavBar from "./NavBar";
import io from 'socket.io-client'
import { useState } from "react";

const socket=io.connect('https://serve-chat-app.herokuapp.com')
 const Home=()=>{
    //const[output,setOutput]=useState('');
    const [message,setMessage]=useState('');
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const form=document.querySelector('.d-flex')
        try {
            await socket.emit('chat',{
                pic:localStorage.getItem('pic'),
                name:localStorage.getItem('name'),
                message:message
            })
            form.reset()
        } catch (error) {
            console.log(error.message)
        }
    }
    socket.on('chat',data=>{
        //setOutput(data)
    const output=document.querySelector('.output');
        output.innerHTML+=`
        <p><img src=${localStorage.getItem('pic')} className="avatar"  width='40' height='40' style={{borderRadius:'20px'}}/>
        :${message}</p><br/>
        <p><img src=${data.pic} className="avatar"  width='40' height='40' style={{borderRadius:'20px'}}/>
        :${data.message}</p><br/>
        `
        })

    return(
        <>
        <NavBar/>
        <div className="container chat-window">
            <div className="output">

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