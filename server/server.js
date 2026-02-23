import "./src/envSelector.js"
import http from "http";
import { connectDB } from "./src/config/db.config.js";

const server = http.createServer();

connectDB();

server.listen(process.env.PORT, () => {
  console.log(`${process.env.NODE_ENV} server started on ${process.env.PORT}`);
});
