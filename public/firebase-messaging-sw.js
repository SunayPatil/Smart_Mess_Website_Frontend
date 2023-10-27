importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   const notificationTitle = payload.data.title;
//   const notificationOptions = {
//     body: payload.data.body,
//     //add favicon from public folder
//     icon: '/IITDH.jpg',
//   };
//   // console.log(notificationTitle, notificationOptions);
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });


self.addEventListener('push', (event) => {
  console.log('notification received');
  const payload = event.data.json();
  console.log(payload.notification);
  const options = {
    // Customize the notification options here
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  // Process the data payload and trigger an action in the main app

  self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
    console.log(clients);
    clients.forEach((client) => {
      client.postMessage({ type: 'notification' });
    });
  });

  self.registration.showNotification(payload.notification.title, options);
});

self.addEventListener('message', function (event) {
  self.clients.fetchAll().then((clients) => {
    clients.forEach(function (client) {
      client.postMessage({ msg: 'Hello from SW' });
    });
  });
});

self.addEventListener('notificationclick', (event) => {
  // Customize what happens when the user clicks on the notification
  event.notification.close();
  // const payload = event.data.json();
  const urlToOpen = new URL('https://smartmess.iitdh.ac.in/dashboard/app', self.location.origin).href;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // If a window tab matching the targeted URL already exists, focus that;
      const existingClient = windowClients.find((client) => client.url === urlToOpen);
      if (existingClient) {
        existingClient.navigate(urlToOpen);
        existingClient.focus();
      } else {
        // Open a new tab with the targeted URL
        clients.openWindow(urlToOpen);
      }
    })
  );
});

