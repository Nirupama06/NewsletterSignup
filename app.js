import express, { response } from "express";
import bodyParser from "body-parser";
import request from "request";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import https from "https";
import mailchimp from "@mailchimp/mailchimp_marketing";
import md5 from "md5";

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
app.use(express.static("public"));

mailchimp.setConfig({
  apiKey: "5e1d7b07e4c9d8a70008c7a66301afc1-us13",
  server: "us13",
});



app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"index.html"));
})

app.post('/', (req, res) => {
 
  const FN = req.body.fn;
  const LN = req.body.ln;
  const email = req.body.mail;
 
  // console.log(fN, lN, email);
 
  // add member
  const listId = "72994b9b65 ";
  const subscribingUser = {
    firstName: FN,
    lastName: LN,
    email: email
  };
 
  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });
 
    console.log(`Successfully added and the ID is ${response.id}`);
    res.sendFile(path.join(__dirname,"success.html"));
  }
  run().catch(e => res.sendFile(path.join(__dirname,"failure.html")));
});





app.listen(process.env.PORT||3000,function(){
    console.log("server is active on port 3000");
})

//api   5e1d7b07e4c9d8a70008c7a66301afc1-us13
//audience id 72994b9b65 

