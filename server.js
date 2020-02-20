const express = require("express");
const path = require("path");
const fs = require("fs").promises;
var idCounter = 1;

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
    res.sendFile(path.join(__dirname, "db", "db.json"));
});

//Write post and delete routes here
app.post("/api/notes", (req, res) => {

    var newNote = req.body;

    newNote.id = idCounter;
    idCounter++;

    fs.readFile(path.join(__dirname, "db", "db.json"), "utf-8")
    .catch((err) => console.log(err))
    .then((data) => {
        data = JSON.parse(data);
        data.push(newNote);
        fs.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(data), "utf-8");
    })
    .catch((err) => console.log(err))
    .then(() => {res.send(newNote)});

});

app.delete("/api/notes/:id", (req, res) => {

    var id = parseInt(req.params.id);

    fs.readFile(path.join(__dirname, "db", "db.json"), "utf-8")
    .catch((err) => console.log(err))
    .then((data) => {
        data = JSON.parse(data);
        
        data.forEach((e, i) => {
            if(e.id === id){
                data.splice(i, 1);
            }
        });

        fs.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(data), "utf-8");
    })
    .catch((err) => console.log(err))
    .then(() => {res.sendFile(path.join(__dirname, "public", "notes.html"))});
});

//------Server Listen-----
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});