// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

self.addEventListener('push', (event) => {
  const payload = event.data.json();
  const options = {
    // Customize the notification options here
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  event.waitUntil(self.registration.showNotification(payload.notification.title, options));
});

self.addEventListener('notificationclick', (event) => {
  // Customize what happens when the user clicks on the notification
  event.notification.close();

  const urlToOpen = new URL('/path-to-open', self.location.origin).href;

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      for (let client of windowClients) {
        if (client.url === urlToOpen) {
          return client.focus();
        }
      }
      return clients.openWindow(urlToOpen);
    })
  );
});
