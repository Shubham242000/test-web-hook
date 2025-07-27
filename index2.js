import express from 'express';
import EventEmitter from 'events';

const app = express();

app.use(express.json())

const webhookEvents = new EventEmitter(); // our in-memory event bus

webhookEvents.on('push', (payload) => {
  console.log("🚀 Code pushed by:", payload.pusher.name);
  console.log("📝 Commit message:", payload.head_commit.message);
});

app.post('/webhook', (req, res) => {
    //
  console.log("Headers from GitHub:", req.headers);
  console.log("Payload from GitHub:", req.body);

  const eventType = req.headers['x-github-event']; // e.g., 'push'
  const payload = req.body;

  console.log(`✅ Webhook received for event: ${eventType}`);

  // Emit internal event
  webhookEvents.emit(eventType, payload);

  res.status(200).send("Webhook received");
});

app.listen(3002 ,() => {
    console.log('server is up')
})