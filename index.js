// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// 2. Create an express app and set the port number.
const app = express();
const port = 4000;

// 3. Use the public folder for static files.
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser)

// 4. When the user goes to the home page it should render the index.ejs file.
// app.get("/", (req, res)=>{
//     res.render("index.ejs");
// })

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.
app.get("/", async(req, res)=>{
    const API_URL = "https://secrets-api.appbrewery.com/random"
    try{
        const responseData = await axios.get(API_URL);
        res.render("index.ejs", {
            secret: responseData.data.secret,
            user: responseData.data.username,

        })
    }catch(err){
        console.log(err.response.data)
        res.status(err.status);
    }
})

// 6. Listen on your predefined port and start the server.

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
