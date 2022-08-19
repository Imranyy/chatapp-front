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
                time:current_time,    
                pic:localStorage.getItem('pic'),
                name:localStorage.getItem('name'),
                message:message
            });
                //send socket push notification
                socket.emit('notify',{
                    pic:localStorage.getItem('pic'),
                    name:localStorage.getItem('name'),
                    message:message
                });

            form.reset()
        } catch (error) {
            console.log(error.message)
        }
    }

    //checking and asking permission
    if(Notification.permission === 'granted'){
        showNotification();
    }else if(Notification.permission !== 'denied'){
        Notification.requestPermission().then(permission =>{
            if(permission === "granted"){
                showNotification();
            }
        });
    };
    //receiving socket notification
        function showNotification(){
            socket.on('notice',data=>{
                console.log('push received...')
               //show notification 
               const notification= new Notification(data.title,{
                body:data.body,
                icon:data.icon,
            requireInteraction:true
            });
            notification.onclick=()=>{
                window.location.href="https://chat-with-mee.web.app/"
            }
         })
        }
            

    
        useEffect(()=>{
            //get recent chats
            socket.on('chat',data=>{
                setOutput1(data)
                })
            //getting chats
        socket.on('output',res=>{
            setOutput(res)
            
       },[socket])
        })

        //month,date,time
        let today=new Date();
          //time
         let hour=addZero(today.getHours());
         let min=addZero(today.getMinutes());

         function addZero(num){
            return num <10?`0${num}`:num;
         }

         let current_time=`${hour}:${min}`;
    return(
        <>
        <NavBar/>
        <div className="container chat-window">
        {output?output.map(res=>(
            <div key={res._id} className="output">
                <img src={res.pic?res.pic:img} className="avatar"  alt='.' width='40' height='40' style={{borderRadius:'20px'}}/><div style={{marginLeft:'52px',marginTop:'-45px'}}>  {res.message} 
                <br/><h6 style={{marginTop:'10px',fontSize:'60%',fontFamily:'monospace', color:'GrayText'}}>From: {res.name}</h6>
                <p style={{float:'right',marginTop:'-5px',fontSize:'60%',fontFamily:'monospace', color:'GrayText'}}>{res.time}</p>
                </div>
                <br/>
            </div>
                )):(<p></p>)}
   
                
                <div className="output1">
                    <img src={output1.pic?output1.pic:img} className="avatar"  alt='.' width='40' height='40' style={{borderRadius:'20px'}}/><div style={{marginLeft:'50px',marginTop:'-45px'}}>  {output1.message?output1.message:'Text something😉😉'}
                    <br/><h6 style={{marginTop:'10px',fontSize:'60%',fontFamily:'monospace', color:'GrayText'}}>From: {output1.name?output1.name:'Crappygam😂'}</h6>
                    <p style={{float:'right',marginTop:'-5px',fontSize:'60%',fontFamily:'monospace', color:'GrayText'}}>{output1.time}</p>
                    </div>
                    <br/>
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