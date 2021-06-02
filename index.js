const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const https=require("https");//require https module

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");

});
app.listen(3000,function(){
  console.log("the server is running at port 3000");
});
app.use(bodyparser.urlencoded({extended:true}));
app.post("/",function(req,res){
  const query=req.body.city;
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=1836571c1038882529e9335733995ae5&units="+unit;
  https.get(url,function(response)
{
  response.on("data",function(data){
    const weatherData=JSON.parse(data);
    const temp=weatherData.main.temp;
    const fell=weatherData.main.feels_like;
    const icon=weatherData.weather[0].icon;//getting icon value from json
    const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png"//concatinating icon value with image url

res.write("<h1>temperature in "+query+" is= "+temp+" in degree</h1>");
res.write("<h2>the weather currently feels like= "+fell+" in degree</h2>");
res.write("<img src="+imageurl+">");//adding url to the image src html tag
res.send();
  })
})
})
