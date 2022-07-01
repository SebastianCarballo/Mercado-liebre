const livereload = require("livereload");
const liveReloadServer = livereload.createServer();

const connectLivereload = require("connect-livereload");


const express = require('express');

const path = require('path');

const app = express();

const port = 3000;



app.use(express.static(path.resolve(__dirname,'public')));

liveReloadServer.watch(path.join(__dirname,'public'));

app.use(connectLivereload());

app.get('/',(req,res) => res.sendFile(path.join(__dirname,'views','home.html')));
app.get('*',(req,res) => res.sendFile(path.join(__dirname,'views','404.html')));

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});


app.listen(port,() => console.log(`El servidor fue levantado correctamente en http://localhost:${port}`));
