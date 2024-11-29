import { Avatar, Button } from "@mui/material"
import "./Appbar.css"
import { Link, useNavigate } from "react-router-dom"

const Appbar = ({authorName}:{authorName:string}) => {
    const navigate=useNavigate()
  return (
   
        <div className="app-bar">
         <Link to={"/blog"}>    
        <div>Medium</div>
        </Link>
        <div className="nav-right">
        {!localStorage.getItem("name")&& <Link to={"/signin"}>
             <Button sx={{background:"green"}} variant="contained">Signin</Button>
             </Link> }  
        {authorName&&localStorage.getItem("token") && <Link to={"/signin"}>
             <Button sx={{background:"green"}} variant="contained" onClick={()=>{
              localStorage.removeItem("name")
              localStorage.removeItem("token")
              navigate("signin")
             }}>Logout</Button>
             </Link> }  

            <Link to={"/publish"}>
             <Button sx={{background:"green"}} variant="contained">Create Post</Button>
             </Link>     
              <Avatar sx={{ background: "green", width: "30px", height: "30px", fontSize: "16px", marginRight:"5px" }}>{localStorage.getItem("name") && authorName[0]}</Avatar></div>
    </div>
   
  )
}

export default Appbar