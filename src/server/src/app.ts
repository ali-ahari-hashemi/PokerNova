import express from "express";
import Game from "./classes/Game";

/**
 * Application:
 * -  Sends gameState to client
 * -  Receives actions from client
 */

const app = express();
const g = new Game();
const port = 3000;

g.addPlayer();
g.addPlayer();
g.addPlayer();
g.print();
g.deal();
g.print();

app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
