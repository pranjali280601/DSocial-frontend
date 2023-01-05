import React,{useState,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom'
import desktopImage from '../../img/b8.jpg'
import M from 'materialize-css'

const Reset=()=>{
    
    const history=useHistory()
   
    const[email,setEmail]=useState("")
   
    const PostData=()=>{
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
        {
          return M.toast({html: "Invalid email",classes:"#f44336 red"})
        }
        
        fetch("/resetpassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
            
                email
            })
            
        }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                    console.log("Error bro")
                   M.toast({html: data.error,classes:"#f44336 red"})
                }
                else{
                    
                    
                    M.toast({html: data.message, classes:"#4caf50 green"})
                    history.push('/signin')
                }
            }).catch(err=>{
                console.log("ERRRRRRR")
                console.log(err)
            })
          
        
    }
    return(
        <div className='App-post' style={{backgroundImage: `url(${desktopImage})`}}>
            <div className="container">
          <div className="row">
        <div className='mycard'>
            <div className='card auth-card input-field'>
                <h2>DSocial</h2>
                
                <input 
                type="text"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <button className="btn waves-effect black"
                onClick={()=>PostData()}>
                    Reset Password
                </button>
                
            </div>
        </div>
        </div>
        </div>
        </div>
    )


}
export default Reset