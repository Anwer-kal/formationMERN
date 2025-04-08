import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationComponent = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [notification, setNotification] = useState({ title: '', body: '' });

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription().then(sub => {
          if (sub) {
            setIsSubscribed(true);
            setSubscription(sub);
          }
        });
      });
    }
  }, []);

  const handleSubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY
      });

      // Send subscription to server
      await axios.post('http://localhost:5000/api/subscribe', subscription);
      
      setSubscription(subscription);
      setIsSubscribed(true);
      alert('Subscribed to push notifications!');
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await subscription.unsubscribe();
      await axios.post('http://localhost:5000/api/unsubscribe', { endpoint: subscription.endpoint });
      
      setSubscription(null);
      setIsSubscribed(false);
      alert('Unsubscribed from push notifications!');
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  };

  const handleSendNotification = async () => {
    try {
      await axios.post('http://localhost:5000/api/send-notification', {
        subscription,
        notification
      });
      alert('Notification sent!');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <div>
      <h1>Push Notification Demo</h1>
      
      {!isSubscribed ? (
        <button onClick={handleSubscribe}>Subscribe to Notifications</button>
      ) : (
        <>
          <button onClick={handleUnsubscribe}>Unsubscribe from Notifications</button>
          <div>
            <h3>Send Test Notification</h3>
            <input
              type="text"
              placeholder="Title"
              value={notification.title}
              onChange={(e) => setNotification({...notification, title: e.target.value})}
            />
            <input
              type="text"
              placeholder="Body"
              value={notification.body}
              onChange={(e) => setNotification({...notification, body: e.target.value})}
            />
            <button onClick={handleSendNotification}>Send Notification</button>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationComponent;