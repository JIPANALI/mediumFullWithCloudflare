// import { Hono } from 'hono'
// import { userRouter } from './routes/user'
// import { blogRouter } from './routes/blog'
// import { cors } from 'hono/cors'


// // const app = new Hono() 
// // with 
//  //@ts-ignore where type checking error before that line it will paste like " //@ts-ignore"
// //if you like this and in app.post there will c.env.DATA_BASE_CONNECTION_POOL it will be error bcz type is not define so solution:

// // or 

// const app = new Hono<{
//   Bindings:{//binding the type with app //here app is Hono Like express
//     DATA_BASE_CONNECTION_POOL_URL:string, //whenevr you use the DATA_BASE_CONNECTION_POOL inside the app.post or get it will not give error for the type checking of the DATA_BASE_CONNECTION_POOL
//     JWT_SECRET:string,
  
// },
// }>()

// Global CORS setup for all routes
// app.use(cors({
//   origin: "*", // Replace with your frontend URL in production
//   allowMethods: ["POST", "GET", "OPTIONS"],
//   allowHeaders: ["Content-Type", "Authorization"],
// }));

// // Route-specific CORS setup
// userRouter.use(cors({
//   origin: '*', // Replace with your frontend URL in production
//   allowMethods: ['POST', 'GET', 'OPTIONS'],
//   allowHeaders: ['Content-Type', 'Authorization'],
// }));

// // Route-specific CORS setup
// blogRouter.use(cors({
//   origin: '*', // Replace with your frontend URL in production
//   allowMethods: ['POST', 'GET', 'OPTIONS'],
//   allowHeaders: ['Content-Type', 'Authorization'],
// }));

// app.use("/*",cors())
// app.use(cors({
//   origin: '*', // Allow all origins, change to your frontend URL in production
//   allowMethods: ['POST', 'GET', 'OPTIONS','get'],
//   allowHeaders: ['Content-Type', 'Authorization'],
// }))

// app.route("/app/v1/user",userRouter) //this prefix =>/app/v1/user/userRouter=>userRouter is the suffix
// app.route("/app/v1/blog",blogRouter) //route will be like http://127.0.0.1:8787/app/v1/blog and you should be pass the authrization of signin in the header section



// export default app


// ========================
import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();
app.use('/*', cors())
app.route("/app/v1/user", userRouter);
app.route("/app/v1/blog", blogRouter);

export default app


