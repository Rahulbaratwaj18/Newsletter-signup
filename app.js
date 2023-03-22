const express = require("express");

const https=require("https");

const request=require("request");

const bodyParser=require("body-parser");

const app=express();


app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.post("/",function(req,res){
   const firstName=req.body.fName;
   const LastName=req.body.lName;
   const email=req.body.email;
   
   const data={
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:LastName
        }

      }
    ]
   };

   const jsonData=JSON.stringify(data);
  
   const url= "https://us18.api.mailchimp.com/3.0/lists/41609fa12a";

   const options={
    method:"POST",
    auth:"rahul:3c2494d0fbbab8bd19a68e9f026f1f6d-us18"
   }

   const request=https.request(url,options,function(response){
     if(response.statusCode===200){
       res.sendFile(__dirname+"/success.html");
     } 
     else{
       res.sendFile(__dirname+"/failure.html");
     }
    
    
    response.on("data",function(data){
          console.log(JSON.parse(data));
       });
   });
   request.write(jsonData);
   request.end();

});

app.post("/failure",function(rq,rs){
  rs.redirect("/");
})


app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});


app.listen(process.env.PORT || 3000 ,function(){
    console.log("The server is running fine");
});



