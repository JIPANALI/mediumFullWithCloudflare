
import { Avatar } from "@mui/material"
import { Blog } from "../hooks" //take the type of the object which are taking as props
import "./SingleBlog.css"

const SingleBlog = ({blog}:{blog:Blog}) => {
  return (
    <div className="simgle-blog-comp">
        <div className="profile">
        <Avatar sx={{ background: "green", width: "30px", height: "30px", fontSize: "18px", marginRight:"5px" }}>{blog.author.name[0] || "A" }</Avatar>
        <div className="profile-name">{blog.author.name}</div>
        </div>
        <div>
            <div className="fnt-sblg-h">{blog.title}</div>
            <div className="fnt-sblg-c">{blog.content}</div>
            
        </div>
        
    </div>
  )
}

export default SingleBlog