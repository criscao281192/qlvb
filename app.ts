import express from 'express';
import router from './router';
const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  }
);

app.listen(8000, () => {
  console.log("Start on port 8000.");
});


app.use("/api", router);


app.use(express.static(__dirname + "/"));

app.get("*", function (req, res) {
  res.sendfile(__dirname + "/index.html");
});