const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// VAPID keys (generate once and keep them safe)
const vapidKeys = {
  publicKey: 'BFXz2PMWbx_We45DldJi_GBphMBJzOhq7YaCs1TE-HVr8DsXu_WkF9CHyWcr7SC5Sdtmz_NWDtJDNQKIUrnf3C8',
  privateKey: '7EwUb_ZuhGcHojlo0Y1HRzXRyQVSpa79RuTGy5igvwo'
};

webpush.setVapidDetails(
  'mailto:example@yourdomain.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// In-memory storage for subscriptions (use a database in production)
let subscriptions = [];

// Subscribe route
app.post('/api/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  console.log('New subscription:', subscription);
  res.status(201).json({});
});

// Unsubscribe route
app.post('/api/unsubscribe', (req, res) => {
  const endpoint = req.body.endpoint;
  subscriptions = subscriptions.filter(s => s.endpoint !== endpoint);
  console.log('Unsubscribed:', endpoint);
  res.status(200).json({});
});

// Send notification route
app.post('/api/send-notification', (req, res) => {
  const { subscription, notification } = req.body;
  
  const payload = JSON.stringify({
    title: notification.title || 'New Notification',
    body: notification.body || 'This is a push notification',
    icon: '/logo192.png',
    url: '/'
  });

  webpush.sendNotification(subscription, payload)
    .then(() => {
      console.log('Notification sent successfully');
      res.status(200).json({ message: 'Notification sent' });
    })
    .catch(err => {
      console.error('Error sending notification:', err);
      res.status(500).json({ error: 'Failed to send notification' });
    });
});

// Send notification to all subscribers
app.post('/api/send-notification-to-all', (req, res) => {
  const notification = req.body;
  const payload = JSON.stringify({
    title: notification.title || 'New Notification',
    body: notification.body || 'This is a broadcast push notification',
    icon: '/logo192.png',
    url: '/'
  });

  const promises = subscriptions.map(sub => 
    webpush.sendNotification(sub, payload).catch(err => {
      console.error(`Error sending to ${sub.endpoint}:`, err);
      // Remove invalid subscriptions
      if (err.statusCode === 410) {
        subscriptions = subscriptions.filter(s => s.endpoint !== sub.endpoint);
      }
    })
  );

  Promise.all(promises)
    .then(() => {
      console.log('Notifications sent to all subscribers');
      res.status(200).json({ message: 'Notifications sent to all subscribers' });
    })
    .catch(err => {
      console.error('Error in sending notifications:', err);
      res.status(500).json({ error: 'Failed to send notifications' });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});