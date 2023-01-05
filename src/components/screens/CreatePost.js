import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import desktopImage from '../../img/b8.jpg'



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Computer Science',
  'Electronics & Communication',
  'Electrical',
  'Biotechnology',
  'Mechanical',
  'Music',
  'Dance',
  'Literature',
  'Miscellaneous',
];

function getStyles(name, spaceName, theme) {
  return {
    fontWeight:
      spaceName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const CreatePost=()=>{
    const history=useHistory()
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState("")
    let flag=0;

    const theme = useTheme();
    const [spaceName, setspaceName] = useState([]);
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setspaceName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };


    // useEffect(()=>{
    //     if(url){
    //     fetch("/createpost",{
    //         method:"post",
    //         headers:{
    //             "Content-Type":"application/json",
    //             "Authorization":"Bearer "+localStorage.getItem("jwt")
    //         },
    //         body:JSON.stringify({
    //             title,
    //             body,
    //             pic:url,
    //             tags: spaceName
    //         })
            
    //     }).then(res=>res.json())
    //         .then(data=>{
    //             if(data.error){
    //                M.toast({html: data.error,classes:"#f44336 red"})
    //             }
    //             else{
    //                 M.toast({html: "Posted Successfully", classes:"#4caf50 green"})
    //                 history.push('/')
    //             }
    //         }).catch(err=>{
    //             console.log(err)
    //         }) 
    //     }
    // },[url]) //this will kick in when the url is set at line 24

    const postDetails=()=>{
        if(image=="")
        {flag=1;}
        else{
        const data= new FormData()
        data.append("file",image)
        data.append("upload_preset","insta_clone")
        data.append("cloud_name","pranjaliinsta")
        fetch("	https://api.cloudinary.com/v1_1/pranjaliinsta/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>{
          flag=1;
            setUrl(data.url)
            console.log("URL",data.url, flag)

        })
        .catch(err=>{
            console.log(err)
        })
      }
      setTimeout(500);
        console.log(spaceName)
        if(flag || url){
          console.log("executed")
        fetch("/createpost",{
          method:"post",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
              title,
              body,
              pic:url,
              tags: spaceName
          })
          
      }).then(res=>res.json())
          .then(data=>{
              if(data.error){
                 M.toast({html: data.error,classes:"#f44336 red"})
              }
              else{
                  M.toast({html: "Posted Successfully", classes:"#4caf50 green"})
                  history.push('/')
              }
          }).catch(err=>{
              console.log(err)
          }) 
        }
    }


    return(
        <div className="App-post" style={{backgroundImage: `url(${desktopImage})` }}>
          <div className="container">
          <div className="row">
        <div className="card input-filed"
        style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input 
            type="text" 
            placeholder="Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)} 
            />
            <input 
            type="text" 
            placeholder="Body"
            value={body}
            onChange={(e)=>setBody(e.target.value)} 
            />
            <div className="file-field input-field">
                <div className="btn waves-effect waves-#000000 black">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={spaceName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, spaceName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
            <button className="btn waves-effect waves-#000000 black"
            onClick={()=>postDetails()}>
                    Post
            </button>
        </div>
        </div>
        </div>
        </div>
    )

}
export default CreatePost