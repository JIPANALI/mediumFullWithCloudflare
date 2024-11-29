import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@metavy/medium-jip-common";
import { cors } from "hono/cors";
//which is commmon by the npm uploaded from comm folder

export const userRouter = new Hono<{
  Bindings: {
    DATA_BASE_CONNECTION_POOL_URL: string;
    JWT_SECRET: string; //here the types is declared
  };
}>();

// userRouter.use(
//   cors({
//     origin: "/*", // Replace with your frontend URL in production
//     allowMethods: ["POST", "GET", "OPTIONS"],
//     allowHeaders: ["Content-Type", "Authorization"],
//   })
// );
userRouter.post("/signup", async (c) => {
  //c=context . it will hold req, res
  //it cant access the env variable wrangler outside of the post api or get api or put api
  //why??: every route independently deploy //it is not neccesery all the route deploy together//that is put env in every route

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATA_BASE_CONNECTION_POOL_URL, //this is taking from wrangler.toml of connection polling string for connect to db
  }).$extends(withAccelerate()); //this extend from the accelerate prisma bcz it is connection to db through the connection pooling

  // insert into  the data into user table
  const body = await c.req.json(); //taking the value from the post api through req which are json file come though the post api

  const { success } = signupInput.safeParse(body); //here zod validation//here the passing the body to zod validation
  if (!success) {
    c.status(411);
    return c.json({
      message: "Input is not correct",
    });
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });

  //when user create it will create a jwt

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  c.status(200);
  return c.json({ jwt: token,name:user.name });
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATA_BASE_CONNECTION_POOL_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    //if zod validation failed then it will return this section
    c.status(411);
    return c.json({
      message: "Input is not correct",
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      //ORM we are find the user by the password and email
      email: body.email,
      password: body.password,
    },
    select:{
      name:true,
      id:true
    }
  });

  if (!user) {
    c.status(403);
    return c.json({
      error: "User is not found",
    });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt:token,name:user.name });
});
