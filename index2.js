import express from 'express';
import EventEmitter from 'events';

const app = express();

app.use(express.json())

const webhookEvents = new EventEmitter(); // our in-memory event bus

webhookEvents.on('push', (payload) => {
  console.log("🚀 Code pushed by:", payload.pusher.name);
  console.log("📝 Commit message:", payload.head_commit.message);
});

webhookEvents.on('pull_request', (payload) => {
  console.log("📂 Pull request opened by:", payload.sender.login);
  console.log("🧾 PR title:", payload.pull_request.title);
});

app.post('/webhook', (req, res) => {
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