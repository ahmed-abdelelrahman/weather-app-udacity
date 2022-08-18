//require the express application framework
const express = require('express');
//initiate an app instance from express library
const app = express();

//enabel any other port
const cors=require('cors')

app.use(cors())

const bodyparser=require('body-parser')

app.use(bodyparser.urlencoded({ extended: false }));//is a body parser for html post form

//setup the port
const port = 5500; 
let projectData = {};

app.use(bodyparser.json());//parse the json format to normal string;

//use the website folder as the initial path for our files
app.use(express.static("website"));



app.post('/add', async (req, res) => {
    const info = await req.body;
    projectData = info;
    res.send(projectData);
});


app.get("/all", async (req, res) => {
    if(projectData){
        res.send(projectData);
    }
});




//listening for the server through the express.listen and which gives us confirmation that the server is working properly
app.listen(port, _=> console.log(`listening on port ${port}`));

