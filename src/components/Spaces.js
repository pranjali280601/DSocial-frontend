import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';

export default function Spaces() {
  const [checked, setChecked] = React.useState([]);
  const [spaceData, setspaceData] = React.useState();
  useEffect(()=>{
    fetch("/getspaces",{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setspaceData(result)
            
        })   
},[])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


// const spacenames = [
//   "Computer Science",
//   "Electrical",
//   "Electronics & Communication",
//   "Mechanical",
//   "Biotechnology",
//   "Dance",
//   "Music",
//   "Literature",
//   "Miscellaneous",
// ]

  return (
    <List dense sx={{ width: '80%', maxWidth: 260, bgcolor: 'background.paper', marginTop: "25px", height:"100%" }}>
        <h6 style={{padding:"8px", fontSize:"22px", marginLeft:"10px", fontFamily:"Squada One"}}>Spaces</h6>
        
          <ListItem
            disablePadding
          >
            <ListItemButton href="/spaces/ComputerScience">
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°1`}
                  src={`https://www.mooc.org/hubfs/cybersecurity-computer-science.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id="checkbox-list-secondary-label-1" primary={`Computer Science (${spaceData && spaceData.ComputerScience.length})`} />
              
            </ListItemButton>
          </ListItem>
         
          <ListItem
            disablePadding
          >
            <ListItemButton href="/spaces/Electrical">
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°2`}
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxWwcU51KKoFLCIx5hcZp9WKdsi5T-PdQqlA&usqp=CAU`}
                />
              </ListItemAvatar>
              <ListItemText id="checkbox-list-secondary-label-1" primary={`Electrical Engineering (${spaceData && spaceData.Electrical.length})`} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
          >
            <ListItemButton href="/spaces/Electronics">
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°4`}
                  src={`https://chennai.vit.ac.in/wp-content/uploads/2020/09/World-Of-Electronics-Scope-Of-Electronics-And-Communication-Engineering-In-India.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id="checkbox-list-secondary-label-3" primary={`Electronics & Communication (${spaceData && spaceData.Electronics.length})`} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
          >
            <ListItemButton href="/spaces/Biotechnology">
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°5`}
                  src={`https://www.betechie.in/content/images/2021/04/5173388.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id="checkbox-list-secondary-label-4" primary={`Biotechnology (${spaceData && spaceData.Biotechnology.length})`} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
          >
            <ListItemButton href="/spaces/Mechanical">
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°6}`}
                  src={`https://collegian.csufresno.edu/wp-content/uploads/2019/09/1m.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id="checkbox-list-secondary-label-5" primary={`Mechanical (${spaceData && spaceData.Mechanical.length})`} />
            </ListItemButton>
          </ListItem>
          <ListItem 
            disablePadding
          >
            <ListItemButton href="/spaces/Dance">
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°7}`}
                  src={`https://images.hindustantimes.com/img/2022/11/10/1600x900/dfgvbh_1668052301193_1668052318411_1668052318411.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id="checkbox-list-secondary-label-5" primary={`Dance (${spaceData && spaceData.Dance.length})`} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
          >
            <ListItemButton href="/spaces/Music">
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°7}`}
                  src={`https://img.freepik.com/free-vector/musical-notes-frame-with-text-space_1017-32857.jpg?w=2000`}
                />
              </ListItemAvatar>
              <ListItemText id="checkbox-list-secondary-label-5" primary={`Music (${spaceData && spaceData.Music.length})`} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
          >
            <ListItemButton href="/spaces/Literature">
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°8}`}
                  src={`https://static.toiimg.com/imagenext/toiblogs/photo/readersblog/wp-content/uploads/2021/02/litreture-TOI.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id="checkbox-list-secondary-label-7" primary={`Literature (${spaceData && spaceData.Literature.length})`} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
          >
            <ListItemButton href="/spaces/Miscellaneous">
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°9}`}
                  src={`https://cdn.dribbble.com/users/77598/screenshots/7958090/media/9dfda44bd1e8b288602cd465655e7a36.png?compress=1&resize=400x300&vertical=top
                  `}
                />
              </ListItemAvatar>
              <ListItemText id="checkbox-list-secondary-label-8" primary={`Miscellaneous (${spaceData && spaceData.Miscellaneous.length})`} />
            </ListItemButton>
          </ListItem>
    
    </List>
  );
}
