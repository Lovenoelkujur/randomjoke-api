const dotenv = require("dotenv");
const express = require("express");
const axios = require("axios");

dotenv.config();

const PORT = 9000;

const app = express();

app.use(express.json());

const API_NINJA_XAPI_KEY = process.env.API_NINJA_X_API_KEY;

app.get('/dad-joke', async (req,res) => {
    try{
        const url = 'https://api.api-ninjas.com/v1/dadjokes';
        const resp = await axios({
            method : "get",
            url : url,
            headers : {
                'X-Api-Key' : API_NINJA_XAPI_KEY
            }
        })
        res.status(200).json(resp.data[0]);
        console.log(res)

    }catch(error){
        console.log(error);
        res.status(500).json({
            error: "Internal server error occured"
        })
    }
})

app.use("/*",(req,res)=>{
    res.status(404).json({
        message : "PAGE NOT FOUND"
    })
})

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})