//initalize the backend
In project folder
1. create a hono library for backend for the cloudlfare worker npm create hono@latest
        1)target directory :backend
        2)cloudflare-waorker as the environment select
        3)install dependency -yes: npm
2. cd backend

3. 
```
npm install
npm run dev
```

```
npm run deploy
```
4. initalize hanlder post, get api like:
const app = new Hono()

app.post('/app/v1/signup', (c) => {
  return c.text('Hello Hono!')
})
5. initialized db(prisma):
       1) try to get db url like neon or avien and paste in .env
       2)try to connection url of prisma pooling acceleration from prisma and  paste in wrangle cloude wrangle.toml
       3)try to the connection pooling where you chose close to  the db of neon db or avien db
       4)all the backend src will take .env (which env variable you are used) file which  is taking from the wrangler.toml not take from .env file
6. install  prisma in backend:
        1)npm i prisma
        2)npx prisma init       

7. setup the of the schema.prisma like connection string
8. setup the schema in schema.prisma .create the schema for the  table
9. after that migrate the table=> npx prisma migrate dev --name init_schema 
 =>init_schema this name of migrate what is change like give the name update the a coulmn then which  column name you have update give the name . whatever you want to give name you can.

10.  after this generate client  for auto suggestion or prisma give you option .find or insert into value in table and with no engine bcz we dont want to all so cloudflare worker is support so that is why --no engine
        =>npx prisma generate --no-engine
11. prisma acceleration :=> npm install @prisma/extension-accelerate     //for the connection pooling   
12. write some logic and npm run dev for run the hono app in cloudflare worker
13. jwt create for user with sign in 
14. middle ware add for every route after like whose route like this as prefix /app/v1/blog/* means  this the prefix /app/v1/blog/ after that we will check 


15. npx wrangler login
16. npx wrangler whoami
17. npm run deploy

