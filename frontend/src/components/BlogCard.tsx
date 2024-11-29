
import { Avatar } from "@mui/material";
import "./BlogCard.css"
import { Link } from "react-router-dom";
import { Badge } from "antd";

// type which are you passed in props here that interface is declare
interface BlogCardPropstype {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id:string;
}
const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}: BlogCardPropstype) => {
    return (
        <Link style={{width:"70%",display:"flex",justifyContent:"center"}} to={`/blog/${id}`}>
        <div className="bg-blog-card" style={{width:"70%"}}>
            <div className="first-line-blogcard">
                <Avatar sx={{ background: "green", width: "18px", height: "20px", fontSize: "13px", marginRight:"5px" }}>{authorName[0]}</Avatar>
               <div style={{marginRight:"5px"}}> <Badge status="success"  /></div>
            <div className="nameAndDate"><span className="font-name">{authorName}</span>.<span className="font-date">{publishedDate}</span></div></div>
            <div className="title">{title}</div>
            <div>{content.slice(0, 100) + "..."}</div>
            <div className="time">{`${Math.ceil(content.length / 100)} minutes reads`}</div>     
        </div>
        </Link>
    )
}

export default BlogCard