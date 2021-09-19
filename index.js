const express = require("express");
const app = express();
const cors = require("cors");
const client = require("./db");
//const PORT = process.env.PORT || 5000;

//process.env.PORT
//process.env.NODE_ENV => production or undefined

//middleware
app.use(cors());
app.use(express.json()); // => allows us to access the req.body

// app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static("./client/build")); => for demonstration

// if (process.env.NODE_ENV === "production") {
//   //server static content
//   //npm run build
//   app.use(express.static(path.join(__dirname, "client/build")));
// }

// console.log(__dirname);
// console.log(path.join(__dirname, "client/build"));


app.post("http://localhost:5000/list", async (req, res) => {
  try {
    const { muscles_trained } = req.body;
    const list = await client.query(
      "INSERT INTO plan (muscles_trained) VALUES($1) RETURNING *",
      [muscles_trained]
    );
    console.log("success")
    res.json(list.rows[0]);
  } catch (err) {
    res.status(500).send(err)
  }
});

//get the list

app.get("http://localhost:5000/list", async (req, res) => {
  console.log("trying")
  try {
    const list = await client.query('SELECT * FROM plan ORDER BY session_id');
    res.json(list.rows);
    console.log("success")
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
});

//get the session by id

app.get("http://localhost:5000/list/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const session = await client.query("SELECT * FROM plan WHERE session_id = $1", [
      id
    ]);

    res.json(session.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update muscles_trained ONLY session

app.put("http://localhost:5000/list/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { muscles_trained } = req.body;
    const updateSession = await client.query(
      "UPDATE plan SET muscles_trained = $1 WHERE session_id = $2",
      [muscles_trained, id]
    );
    res.json("Muscles_trained category was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a session

app.delete("http://localhost:5000/list/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSession = await client.query("DELETE FROM plan WHERE session_id = $1", [
      id
    ]);
    res.json("Session was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
