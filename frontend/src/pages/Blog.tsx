// import BlogCard from "../components/BlogCard"
// import { useBlog } from "../hooks"

// import "./Blog.css"
// const Blog = () => {
//     const {blogData,loading}=useBlog();

//     if(loading){
//         return <div>
//             loading......
//         </div>
//     }
//   return (
//     <div className="blog-page">
//         {blogData.map(blog=>
//              <BlogCard authorName={"Jipan ali"} title={"title of the blogkgjgguguyyfjchgdyttftcjgksfsfufdsufu"} 
//              content={"content of the blogjhfuhfhjdjsfudyfasbdvzshfuyjgjgjgjgjgjgjljljkljkljlkjklhlhkkhkhkrfzuvjxvzmfuycfzuxvcjfzkurcuzfk,uugtdiskdugiustsidsvhdhgsudgs"}
//               publishedDate="26 june 2024"/>
//         )}
       
//           </div>
//   )
// }

// export default Blog


import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";

import {  useBlogs } from "../hooks";
import "./Blog.css";

const Blog = () => {
  const {blogs,loading} = useBlogs();
    console.log("blogData",blogs)
  if (loading) {
    return <div  className="blog-page">
        <BlogSkeleton/>
        <BlogSkeleton />
        <BlogSkeleton />
        
    </div>;
  }
  console.log("dataval",blogs)

  return (
    <div className="blog-page">
      {blogs.map((blog) => 
        <BlogCard
        
          id={blog.id}
          authorName={blog.author.name || "Anonymous"}
          title={blog.title}
          content={blog.content}
          publishedDate={"26 june 2024"}
        />
      )}
    </div>
  );
};

export default Blog;
