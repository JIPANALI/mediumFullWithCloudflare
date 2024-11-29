# Project Overview

This project is built for user can share their thaught and get knowledge from others post also

## Technologies Used

### Frontend
- **React.js**: Provides a dynamic and responsive user interface.

### Backend
- **Serverless Architecture**: Powered by **Cloudflare Workers** for fast and reliable serverless computing.
- **Hono Framework**: Lightweight and efficient backend framework.

### Database
- **PostgreSQL**: Utilized with a **connection pool** for optimized database performance.

### Validation
- **Zod**: Used for input validation, including a custom validation package uploaded to **npm** and shared across the project via a **common folder**.

## Key Features
- **Scalable Backend**: Designed with a serverless approach for high availability.
- **Reusable Validation**: Custom **Zod** validation package for consistent data validation.
- **Efficient Database Management**: Connection pooling for seamless database operations.


#For Starting this Project 

1. npm Install  in each folder backend, frontend and common folder

<!-- For Backend  -->
2. cd backend 
3. paste in the postgressql db String in .env which is shown in .env.example
4. paste the connection pool string of Prisma Accelerate which was created by this  ==>https://www.prisma.io/accelerate
5.   paste in wrangler.toml in backend DATA_BASE_CONNECTION_POOL_URL=""
JWT_SECRET=""

6. For locally run npm run dev 

or

 if you have cloudflare account then 
            i)npx wrangler login
            ii)npm run deploy


<!-- For Fronend  -->

whatever you got the BackendUrl 
1)copy the BackendUrl  and paste in config.ts which is present in frontend
2)cd frontend 
3)npm run dev

