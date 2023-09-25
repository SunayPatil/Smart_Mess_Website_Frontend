importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   const notificationTitle = payload.data.title;
//   const notificationOptions = {
//     body: payload.data.body,
//     //add favicon from public folder
//     icon: '/assets/images/IITDH.jpg',
//   };
//   // console.log(notificationTitle, notificationOptions);
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

self.addEventListener('push', (event) => {
  const payload = event.data.json();
  const options = {
    // Customize the notification options here
    body: payload.notification.body,
    icon: '/IITDH.jpg'
  };

  self.registration.showNotification(payload.notification.title, options);
});

self.addEventListener('notificationclick', (event) => {
  // Customize what happens when the user clicks on the notification
  event.notification.close();

  const urlToOpen = new URL('http://localhost:3000/login', self.location.origin).href;

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
