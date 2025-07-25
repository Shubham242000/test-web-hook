import express from 'express'
// i have made this webhook live using ngrok, and then added this webhook to 
// a github repo called test-web-hook
// now when I commit , the webhook should be hit and i should see the console message in my response. 

const app = express();

app.get('/', (req, res) => {
    res.status(200).send({
        name : 'SHUBHAM',
        age : 25.1
    })
})

app.post('/webhook', (req, res) => {
    console.log("✅ Webhook received!");
  console.log("📦 Payload:", req.body);

  // Send 200 OK to acknowledge
  res.status(200).send("Webhook received");
})

app.listen(3002 ,() => {
    console.log('server is up')
})