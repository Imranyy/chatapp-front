import NavBar from "./NavBar";
import { useEffect, useState } from "react";


 const Home=()=>{
    const[output,setOutput]=useState('');
    const [message,setMessage]=useState('');
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const form=document.querySelector('.d-flex')
        try {
            const url='https://serve-chat-app.herokuapp.com/api/chat';
            await fetch(url,{
                method:"POST",
                body:JSON.stringify({
                    pic:localStorage.getItem('pic'),
                    name:localStorage.getItem('name'),
                    message:message
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            
            form.reset()
        } catch (error) {
            console.log(error.message)
        }
    }

    const getChats=async()=>{
        try {
            const url='https://serve-chat-app.herokuapp.com/api/chat';
            const response=await fetch(url,{
                method:'GET'
            })
            const parseRes=await response.json()
            setOutput(parseRes)
        } catch (error) {
            
        }
    }
   useEffect(()=>{
    getChats();
   },[])
    
        

    return(
        <>
        <NavBar/>
        <div className="container chat-window">
            <div className="output">
                {output?output.map(data=>(
                     <div key={data._id}>
                        <p><img src={data.pic} className="avatar"  width='40' height='40' style={{borderRadius:'20px'}}/>
                     {data.message}</p><br/>
                     </div>
                )):'No Chats'}
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