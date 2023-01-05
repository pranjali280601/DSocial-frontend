import React,{useEffect,useState,useContext} from 'react';
import { Link } from 'react-router-dom';
import {UserContext} from "../../App"
import desktopImage from '../../img/b8.jpg'

const Profile=()=>{
    const [myposts,setPosts]=useState([])
    const {state,dispatch}=useContext(UserContext)
    const[image,setImage]=useState("")
    const[url,setUrl]=useState()

    useEffect(()=>{
        fetch("/mypost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
            .then(result=>{
                console.log(result)
                setPosts(result.mypost)
            })   
    },[])

    useEffect(()=>{
        if(image){
            const data= new FormData()
            data.append("file",image)
            data.append("upload_preset","insta_clone")
            data.append("cloud_name","pranjaliinsta")
            fetch("	https://api.cloudinary.com/v1_1/pranjaliinsta/image/upload",{
                method:"post",
                body:data
            }).then(res=>res.json())
            .then(data=>{
  
                setUrl(data.url)
                localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
                dispatch({
                    type:"UPDATEPIC",
                    payload:data.url
                })
                fetch("/updatepic",{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        pic:data.url
                    })
                }).then(res=>res.json())
                    .then(result=>{
                        
                        console.log(result)
                        localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
                        dispatch({type:"UPDATEPIC",payload:result.pic})
                       })
                      
                    }).catch(err=>{
                        console.log(err)
                    }) 
                // window.location.reload()
            }
        },[image])
    
        const deletePost=(postid)=>{
   
            fetch(`/deletepost/${postid}`,{
                method:"delete",
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                }
            }).then(res=>res.json())
                .then(result=>{
                    console.log(result)
                    const newData=myposts.filter(item=>{
                        return item._id !== result._id
                    })
                    setPosts(newData)
                 }).catch(err=>{
                     console.log(err)
                 }) 
            }

    const uploadPhoto=(file)=>{
        setImage(file) 
    }
    return(
        <div className="App-home" style={{backgroundImage: `url(${desktopImage})` }}>
        <div className="container">
           
           <div className="row">

            <div className="col s12 white ">
        <div style={{
            maxWidth:"650px",margin:"0px auto"
        }}>
            <div className="col s12" style={{
                margin:"18px 10px",
                borderBottom:"1px solid grey"
            }} >
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                
            }}>
                <div className="col s10 m6 l3 white" >
                    <img src={state?state.pic:"Loading..."}
                    style={{position:"relative", width:"180px",height:"180px",borderRadius:"90px" }}
                    />
                </div>
                <div className="col s3 m6 l3 white" >
                    <h4 style={{fontFamily:"Playfair Display"}}>{state?state.name:"Loading..."}</h4>
                    {/* <h5 style={{fontFamily:"Playfair Display"}}>{state?state.email:"Loading..."}</h5> */}
                    <h5 style={{fontFamily:"Playfair Display"}}>{state?state.rollno:"Loading..."}</h5>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        width: "108% "
                    }}>
                        <h6>{myposts.length} posts</h6>
    
                    </div>
                    
                </div>
            </div>
        
            <div className="file-field input-field" >
                <div className="btn waves-effect black" style={{width:"35%"}}>
                    <span>Update pic</span>
                    <input type="file" onChange={(e)=>uploadPhoto(e.target.files[0])} />
                </div>
               
                </div>
                </div>
               </div>
               </div>
        <div className="row">
        <div className="col s12  N/A transparent">
                 <div className="home">{
                         myposts.map(item=>{
                        console.log("it",item)
                        return(
                            
                            <div className="card home-card" key={item._id}>
                            <div style={{
                                display:"flex",
                                justifyContent:"flex-start",
                                padding:"10px"
                                }}>
                             <div>
                                <img src={state?state.pic:"Loading..."}
                                 className="circle responsive-img" style={{width:"40px",height:"40px",borderRadius:"20px",margin: "4px 5px 1px 4px", padding:"4px"}} />
                            </div>
                            <div className="col s12">
                            <Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id : "/profile"} style={{fontSize:"18px", fontWeight:"bold", position: "relative",top:"8px"}}>
                            {item.postedBy.name}</Link> 
                        
                               {item.postedBy._id == state._id && <i className="material-icons " 
                               style={{ float:"right",color:"black", position: "relative",top:"10px",right: "2px"}} 
                                onClick={()=>{ 
                                    deletePost(item._id)
                                }}>delete</i>
                            }
                           </div>
                            </div>
                            <div className='line' style={{position: "relative",top:"-20px"}} ><hr></hr></div>
                            <div className='card-content' style={{position:"relative", top:"-50px"}}>
                            <h6 style={{color:"black", fontSize:"15px", position:"relative", top:"1%"}}> {item.title}</h6>
                                <h6 style={{color:"black", fontSize:"15px", position:"relative", top:"1%"}}> {item.body}</h6>
                            

                            <div className="card-image">
                             <img src={item.photo} style={{paddingBottom:"10px"}}/>
                            </div>
                            
                            {/* {
                            item.likes.includes(state._id)?
                            <i className="material-icons" style={{color:"red", fontSize:"30px"}} onClick={()=>{ unlikePost(item._id)}}>favorite</i>
                            : <i className="material-icons" style={{color:"black", fontSize:"30px"}} onClick={()=>{likePost(item._id)}}>favorite_border</i>
                             } */}
                             <i className="material-icons" style={{color:"red", fontSize:"30px"}} >favorite</i>
                            <i className="material-icons" style={{color:"black", marginLeft:"13px", fontSize:"30px"}} >comment_icon</i>
                            <h6 style={{color:"black", fontSize:"14px"}}>{item.likes.length} likes</h6>
                            
                            
                            {
                            item.comments.map(record=>{
                                console.log("Item", item)
                                return(
                                 <h6 key={record._id} style={{color:"black", fontSize:"15px"}}><span style={{fontWeight:"bold"}}>{record.postedBy.name}</span> {record.text}</h6>
                                 ) 
                            
                            })
                            }
{/*                           
                            <input type="text" 
                            placeholder="Add a comment"
                            value={newComment}
                            onChange={(e)=>setNewComment(e.target.value)} />
                            <button onClick={()=>makeComment(item._id)}>Post</button> */}
                    
                            </div>
                            </div>
                            

                         )
                    })
                     }
                     </div>
                     </div>
        </div>
        
        </div>
        </div>
        </div>
    )


}
export default Profile