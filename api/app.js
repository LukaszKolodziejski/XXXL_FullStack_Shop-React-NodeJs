import path from "path";
import express from "express";
import bodyParser from "body-parser";

import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import errorRoutes from "./routes/404";
import errorController from "./controllers/error";

const port = process.env.PORT || 8080;
const app = express();

// app.engine("handlebars", expressHbs());
// app.set("view engine", "handlebars");
// app.set("views", "views");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  next();
});

// app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use("/", shopRoutes);
app.use(errorController);

app.listen(port, () => {
  console.log(`Server has started on port http://localhost:${port}`);
});
