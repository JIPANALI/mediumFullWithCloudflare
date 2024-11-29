import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import "./SingleBlogPage.css"
import SingleBlog from "../components/SingleBlog";
import { CircularProgress } from "@mui/material";

const SingleBlogPage = () => {
    const {id}=useParams(); //take the id from the url by using this hook and take the id which is string type
    const {blog,loading}=useBlog({id:String(id) ||"" // pass the parameter the id in useBlock which the for the oarticular data by the id
    }); 

    if(loading){
        return<div className="singleBlogpage" style={{display:"flex",alignItems:"center",justifyContent:"center"}} ><CircularProgress sx={{color:"green"}} color="success" /></div> //if loading this value will show
    }

    // this is bcz when initally data might be not present so that is why if loading it will show . loading is being false 
    // after loading is false thnen it will come this section
  if (!blog) {
    return <div className="singleBlogpage">Blog not found</div>;
  }

  //if blog data is came then it will come this section
      return (
    <div className="singleBlogpage">
        <SingleBlog blog={blog}/>
    </div>
  )
}

export default SingleBlogPage