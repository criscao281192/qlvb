import express, { Request, Response, NextFunction } from "express";
import formData from "express-form-data";
import router from "./router";
import os from "os";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { UserLogin } from "./models/user";

const app: express.Express = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
  transports: ["polling", "websocket"],
});

app.use(cors());
app.use(express.json());
app.post("/api/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const bcrypt = require("bcrypt")
    const user: any = await UserLogin.findOne({
      where: { username: username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({ success: true, message: "Đăng nhập thành công" });
    } else {
      res.status(401).json({
        success: false,
        message:
          "Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.",
      });
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra đăng nhập:", error);
    res
      .status(500)
      .json({ success: false, message: "Đã xảy ra lỗi khi đăng nhập." });
  }
});

app.use(express.urlencoded({ extended: true }));

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

app.use(formData.parse(options));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.use(cors());
const rooms: Record<string, Socket[]> = {};
io.on("connection", function (client: Socket) {
  console.log("A");

  let room: string;

  client.on("join", function (data: string) {
    room = data;
    if (!rooms[room]) {
      rooms[room] = [];
    }
    rooms[room].push(client);
    client.join(room);
  });

  client.on("message", function (data: any) {
    io.to(room).emit("message", { name: data.name, message: data.message });
  });

  client.on("disconnect", function () {
    if (room && rooms[room]) {
      const index = rooms[room].indexOf(client);
      if (index !== -1) {
        rooms[room].splice(index, 1);
        if (rooms[room].length === 0) {
          delete rooms[room];
        }
      }
    }
  });
});

app.use("/api", router);

app.use(express.static(__dirname + "/"));

app.get("*", function (req: Request, res: Response) {
  res.sendFile(__dirname + "/index.html");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
