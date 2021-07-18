const bodyparser = require("body-parser");
const express=require("express");
const https=require("https");

const app=express();
app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
    const cityname=req.body.cityname;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ cityname + "&appid=b31da864c1b425e601599f404ee4cf18&units=metric"
    https.get(url,function(response){
        response.on("data",function(data){
            const data1=JSON.parse(data);
            const temp=data1.main.temp;
            const weatherdes=data1.weather[0].description;
            const icon=data1.weather[0].icon;
            const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>the description of weathet in "+cityname+" is "+weatherdes+"</p>");
            res.write("<h1>the temp in "+cityname+" is"+temp+"</h1>");
            res.write("<img src="+imageurl+">");
            res.send();

        })
    })
})



app.listen(500,function(){
    console.log("hi your server is ready");
})
