import 'dotenv/config'
import http from 'http';
import {userRouter} from "./routes/userRouter.js";

console.log(process.env)

const hostname = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3002;

const server = http.createServer(userRouter);


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});