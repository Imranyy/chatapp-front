const publicVapidKey='BJ3OlUIn9QFTDtL9rUamLHYpUvMR8NgxOCWcpOSeJv7OenqN-zdt-i3sMAuRkMWsCwtE5sCDPnnccIkXZiCIf5Q';

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
            message:'Welcome'
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
