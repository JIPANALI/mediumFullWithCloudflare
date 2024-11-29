import { Skeleton } from "@mui/material"


const BlogSkeleton = () => {
  return (
    <div style={{marginTop:"4rem",display:"flex",flexDirection:"column",gap:"10px"}}>
       <Skeleton sx={{ width: '200px', height:"20px", background: 'rgb(15, 15, 15)' }} /> 
       <Skeleton sx={{ width: '600px', height:"40px", background: 'rgb(15, 15, 15)' }} /> 
       <Skeleton sx={{ width: '600px', height:"100px", background: 'rgb(15, 15, 15)' }} /> 
    </div>

  )
}

export default BlogSkeleton