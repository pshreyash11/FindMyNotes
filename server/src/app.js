import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// app.use(bodyParser.json())
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
import notesRouter from "./routes/notes.routes.js"

app.use("/api/v1/users",userRouter);
// url will be like this :- http://localhost:5000/api/v1/users/register


app.use("/api/v1/notes",notesRouter);

export { app };
