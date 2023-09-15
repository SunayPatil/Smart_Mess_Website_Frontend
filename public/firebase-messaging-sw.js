importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

//we have to fetch the firebase config from the server
const firebaseConfig = {
  apiKey: "AIzaSyBbuiEP6GUKrSoAP4GeUn0QUZpwpsdVw0M",
  authDomain: "smart-mess-web.firebaseapp.com",
  projectId: "smart-mess-web",
  storageBucket: "smart-mess-web.appspot.com",
  messagingSenderId: "102601518966",
  appId: "1:102601518966:web:685b295fc469c66dfc9457",
  measurementId: "G-ZXLL3CBE4R"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// self.addEventListener('push', (event) => {
//   const payload = event.data.json();
//   const options = {
//     // Customize the notification options here
//     body: payload.notification.body,
//     icon: payload.notification.icon,
//   };

//   event.waitUntil(self.registration.showNotification(payload.notification.title, options));
// });

// self.addEventListener('notificationclick', (event) => {
//   // Customize what happens when the user clicks on the notification
//   event.notification.close();

//   const urlToOpen = new URL('/path-to-open', self.location.origin).href;

//   event.waitUntil(
//     clients.matchAll({ type: 'window' }).then((windowClients) => {
//       for (let client of windowClients) {
//         if (client.url === urlToOpen) {
//           return client.focus();
//         }
//       }
//       return clients.openWindow(urlToOpen);
//     })
//   );
// });
