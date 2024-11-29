import z from "zod";
//here type is declare by the zod  for each section and each router
export const signupInput=z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})

export const signinInput=z.object({
    email:z.string().email(),
    password:z.string().min(6),
})

export const createblogInput=z.object({
    title:z.string(),
    content:z.string()
})


export const updateblogInput=z.object({
    title:z.string(),
    content:z.string(),
    id:z.string()
})
// above all are for the backend

//here type is inferred so others also can be use// it is for the front not for the backend
export type SignUpInput=z.infer<typeof signupInput>
export type SignIpInput=z.infer<typeof signinInput>
export type CreateBlogInput=z.infer<typeof createblogInput>
export type UpdateBlogInput=z.infer<typeof updateblogInput>