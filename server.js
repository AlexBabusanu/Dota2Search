const express = require("express");
const Dota2Items = require("./src/assets/output.json");
const Dota2Paths = require("./src/assets/items.json");
const Dota2Icons = require("./src/assets/570.json");
const path = require("path");
const http = require("http");
const cors = require("cors");

const app = express();

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));
app.use(express.static(path.join(__dirname, "dist/Dota2Search")));



app.get("/items", (req, res) => {
    if (Dota2Items.items_game.items[req.query.index]){
    Dota2Items.items_game.items[req.query.index].index = req.query.index;
        if (Dota2Icons[Dota2Items.items_game.items[req.query.index].name]){
            Dota2Items.items_game.items[req.query.index].image_inventory = Dota2Icons[Dota2Items.items_game.items[req.query.index].name];
        } else {
            Dota2Items.items_game.items[req.query.index].image_inventory = Dota2Paths[req.query.index].path;
        }
    
    }
    res.send(Dota2Items.items_game.items[req.query.index]);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/DOta2Search/index.html"));
})

const port = process.env.port || "3000";
app.set("port", port);

const server = http.createServer(app);
server.listen(port, ()=>{
    console.log("Running on port:" + port);
})