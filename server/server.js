import "./src/envSelector.js";
import http from "http";
import { connectDB } from "./src/config/db.config.js";
import app from "./src/app.js";

const server = http.createServer(app);

connectDB();

server.listen(process.env.PORT, () => {
  console.log(`${process.env.NODE_ENV} server started on ${process.env.PORT}`);
});
