// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";
// import { Hono } from "hono";
// import { verify } from "hono/jwt";
// import { createblogInput, updateblogInput } from "@metavy/medium-jip-common";
// import { cors } from "hono/cors";

// export const blogRouter = new Hono<{
//   Bindings: {
//     DATA_BASE_CONNECTION_POOL_URL: string;
//     JWT_SECRET: string;
//   },
//   Variables:{
//     userId: string;
//   }
// }>();

// // blogRouter.use(cors(
// //   {
// //     origin: "/*", // Replace with your frontend URL in production
// //     allowMethods: ["POST", "GET", "OPTIONS"],
// //     allowHeaders: ["Content-Type", "Authorization"],
// //   }
// // ))
// // Middleware for authentication with prefix /* for allrouter in the blog router here  //middleware by the jwt
// blogRouter.use("/*", async (c, next) => {
//   const authHeader = c.req.header("authorization") || "";
//   try {
//     const user = await verify(authHeader, c.env.JWT_SECRET) as { id: string }; // Type assertion//verify the jwt ith the secret key
//     if (user) {
//       c.set("userId", user.id);//here setting the userId whcih is found using the jwt and set for the next router so next router will use//means next part of the route will use 
//       await next(); // Pass to the next middleware or route handler//this is telling that run the next part of the router
//     } else {
//       c.status(403);
//       return c.json({ message: "You are not logged in" });
//     }
//   } catch (error) {
//     c.status(403);
//     return c.json({ message: "Invalid token" });
//   }
// });

// // --blog middleware end----------------->

// blogRouter.post("/", async (c) => {
//   const body = await c.req.json(); //take the value from this router
//   const userIdVal=c.get("userId")// get the value which were passed in the previous middleware
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATA_BASE_CONNECTION_POOL_URL, //this throgh the connection pooling
//   }).$extends(withAccelerate());

//   const {success}=createblogInput.safeParse(body);
//   if(!success){
//     c.status(411);
//    return c.json({
//      message:"Blog is not correct"
//    })
//   }
 
//   //create blog post into db throgh the ORM put int to db
//   const blog = await prisma.post.create({
//     data: {
//       title: body.title,
//       content: body.content,
//       authorId: userIdVal//authorId it will take from the token which is already signin take from that token of user id and by the token 
//       //by the token id we will get the user.id after verfying. that verified by the middleware which was happend in middleware in routes folder in blog.ts routes
//       //from there is token verified then from there we passed the userId set by c and here take the user of whos is sign in by the get 
//       //that value put here so it relationship happend
//     },
//   });
//   return c.json({
//     id: blog.id, //when post is created after that which id will be generate by the sql it will return to front end
//   });
// });

// //   -----------------------------

// blogRouter.put("/", async (c) => {
//   const body = await c.req.json();
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATA_BASE_CONNECTION_POOL_URL,
//   }).$extends(withAccelerate());

//   const {success}=updateblogInput.safeParse(body)
//   if(!success){
//     c.status(411);
//    return c.json({
//      message:"Blog is not correct"
//    })
//   }

//   //create blog post into db throgh the ORM
//   const blog = await prisma.post.update({
//     where: {
//       id: body.id, //where we want to update that id of the blog you want to chnage
//     },
//     data: {
//       title: body.title, //which field you want to update
//       content: body.content, //title and content can be update by this route where id=which id update
//     },
//   });
//   return c.json({
//     id: blog.id, //return the blog id of you have been updated
//   });
// });


// //this is for the every post of the partcular user id and it 
// blogRouter.get("/bulk", async(c) => {
//     const body = await c.req.json();
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATA_BASE_CONNECTION_POOL_URL,
//   }).$extends(withAccelerate());

//   const blogs=await prisma.post.findMany(
//     {
//       select:{  //these are return when this
//         content:true,
//         title:true,
//         id:true,
//         author:{
//           select:{
//             name:true
//           }
//         }
//       }
//     }
//   ); //take the many post from post table all blog pot will show of all who has posted not by individually  //
//   //just make sure that you are just logged in by authorization which you have passed by the middle ware above at the top

//   return c.json({
//     blogs
//   })
// });

// blogRouter.get("/:id", async (c) => { 
//   const idOfPost = await c.req.param("id");
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATA_BASE_CONNECTION_POOL_URL,
//   }).$extends(withAccelerate());

//   try {
//     //create blog post into db throgh the ORM
//     const blog = await prisma.post.findFirst({
//       where: {
//         id:idOfPost //which post of the post id you have to paste here 
//       },
//     });
//     return c.json({
//       blog, //return the blog by this id of param you have passed of post id
//     });
//   } catch (error) {
//     c.status(411);
//     return c.json({
//       message: "Error while fetching blog post",
//     });
//   }
// });


// =========================================
import { createblogInput, updateblogInput } from "@metavy/medium-jip-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
      DATA_BASE_CONNECTION_POOL_URL: string;
        JWT_SECRET: string;
    }, 
    Variables: {
        userId: string;
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
          //@ts-ignore

            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch(e) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
});

// blogRouter.post('/', async (c) => {
//     const body = await c.req.json();
//     const { success } = createblogInput.safeParse(body);
//     if (!success) {
//         c.status(411);
//         return c.json({
//             message: "Inputs not correct"
//         })
//     }

//     const authorId = c.get("userId");
//     const prisma = new PrismaClient({
//       datasourceUrl: c.env.DATA_BASE_CONNECTION_POOL_URL,
//     }).$extends(withAccelerate())

//     const blog = await prisma.post.create({
//         data: {
//             title: body.title,
//             content: body.content,
//             authorId: String(authorId)
//         }
//     })

//     return c.json({
//         id: blog.id
//     })
// })


blogRouter.post("/", async (c) => {
  const body = await c.req.json(); //take the value from this router
  const userIdVal=c.get("userId")// get the value which were passed in the previous middleware
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATA_BASE_CONNECTION_POOL_URL, //this throgh the connection pooling
  }).$extends(withAccelerate());

  const {success}=createblogInput.safeParse(body);
  if(!success){
    c.status(411);
   return c.json({
     message:"Blog is not correct"
   })
  }
 
  //create blog post into db throgh the ORM put int to db
  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userIdVal//authorId it will take from the token which is already signin take from that token of user id and by the token 
      //by the token id we will get the user.id after verfying. that verified by the middleware which was happend in middleware in routes folder in blog.ts routes
      //from there is token verified then from there we passed the userId set by c and here take the user of whos is sign in by the get 
      //that value put here so it relationship happend
    },
  });
  return c.json({
    id: blog.id, //when post is created after that which id will be generate by the sql it will return to front end
  });
});


blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateblogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATA_BASE_CONNECTION_POOL_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.update({
        where: {
            id: body.id
        }, 
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: blog.id
    })
})

// Todo: add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATA_BASE_CONNECTION_POOL_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({
        blogs
    })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATA_BASE_CONNECTION_POOL_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: String(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
    
        return c.json({
            blog
        });
    } catch(e) {
        c.status(411); // 4
        return c.json({
            message: "Error while fetching blog post"
        });
    }
})
