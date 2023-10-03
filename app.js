import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let item = [];
let workItem = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  let today = new Date();
  let options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  let day = today.toLocaleDateString("en-US", options);
  res.render("index.ejs", {
    listtitle: day,
    newListItems: item,
  });
});

app.post("/", (req, res) => {
  item.push(req.body.newItem);
  res.redirect("/");
});

app.get("/work", (req, res) => {
  res.render("work.ejs", {
    listtitle: "Work List",
    newListItems: workItem,
  });
});

app.post("/work", (req, res) => {
  workItem.push(req.body.newItem);
  res.redirect("/work");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
