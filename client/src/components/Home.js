import NavBar from "./NavBar";
import io from 'socket.io-client';
import img from '../img2.png'
import { useState,useEffect } from "react";

const socket=io.connect('https://serve-chat-app.herokuapp.com')
 const Home=()=>{
    const[output,setOutput]=useState('');
    const [output1,setOutput1]=useState('')
    const [message,setMessage]=useState('');
    
    const publicVapidKey='BJ3OlUIn9QFTDtL9rUamLHYpUvMR8NgxOCWcpOSeJv7OenqN-zdt-i3sMAuRkMWsCwtE5sCDPnnccIkXZiCIf5Q';

   
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const form=document.querySelector('.d-flex')
        try {
                socket.emit('chat',{
                time:current_time,    
                pic:localStorage.getItem('pic'),
                name:localStorage.getItem('name'),
                message:message
            })
            //check for sw
                if('serviceWorker' in navigator){
                    send().catch(err=>console.error(err));
                }
                //register sw, register push, send push
                async function send(){
                    //registering sw
                    console.log('Registering sw...')
                    const register=await navigator.serviceWorker.register('/sw.js',{
                        scope:'/'
                    });
                    console.log('sw registered...');
                    //registering push
                    console.log('registering push...');
                    const subscription=await register.pushManager.subscribe({
                        userVisibleOnly:true,
                        applicationServerKey:urlBase64ToUint8Arry(publicVapidKey)
                    });
                    console.log('push registered...');
                    //send push notification
                    console.log('sending push...')
                    await fetch('https://serve-chat-app.herokuapp.com/subscribe',{
                        method:'POST',
                        body:JSON.stringify({
                            subscription,
                            name:localStorage.getItem('name'),
                            pic:localStorage.getItem('pic'),
                            message:message
                        }),
                        headers:{
                            'content-type':'application/json'
                        }
                    });
                    console.log('push sent...');
                }

                function urlBase64ToUint8Arry(base64String){
                    const padding= '='.repeat((4-base64String.length % 4) %4);
                    const base64=(base64String + padding)
                    .replace(/\-/g, '+')
                    .replace(/_/g,'/');
                    const rawData=window.atob(base64);
                    const outputArray=new Uint8Array(rawData.length);
                    for(let i=0;i<rawData.length;++i){
                        outputArray[i]=rawData.charCodeAt(i)
                    }
                    return outputArray;
                }

            form.reset()
        } catch (error) {
            console.log(error.message)
        }
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
                <br/><h6 style={{marginTop:'10px',fontSize:'12px',fontFamily:'monospace', color:'GrayText'}}>From: {res.name}</h6>
                <p style={{float:'right',marginTop:'-1px',fontSize:'12px',fontFamily:'monospace', color:'GrayText'}}>{res.time}</p>
                </div>
                <br/>
            </div>
                )):'No chats'}
   
                
                <div className="output1">
                    <img src={output1.pic?output1.pic:img} className="avatar"  alt='.' width='40' height='40' style={{borderRadius:'20px'}}/><div style={{marginLeft:'50px',marginTop:'-45px'}}>  {output1.message?output1.message:'Text something😉😉'}
                    <br/><h6 style={{marginTop:'10px',fontSize:'12px',fontFamily:'monospace', color:'GrayText'}}>From: {output1.name?output1.name:'Crappygam😂'}</h6>
                    <p style={{float:'right',marginTop:'-1px',fontSize:'12px',fontFamily:'monospace', color:'GrayText'}}>{output1.time}</p>
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