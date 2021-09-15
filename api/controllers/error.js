import path from "path";

const get404 = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../views/404.html"));
};

export default get404;
