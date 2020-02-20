const express = require("express");
const path = require("path");

var PORT = process.env.PORT || 3000;
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//------Routes-----
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.json(path.join(__dirname, "db", "db.json"));
});

//------Server Listen-----
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});