const fetch = require("node-fetch");

const USERS = [
  {
    name: "Juan",
    externalUserId: "user_juan"
  },
  {
    name: "Laura",
    externalUserId: "user_laura"
  }
];

const sendNotification = async (user) => {
  const response = await fetch("https://onesignal.com/api/v1/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.ONESIGNAL_API_KEY}`
    },
    body: JSON.stringify({
      app_id: process.env.ONESIGNAL_APP_ID,
      include_external_user_ids: [user.externalUserId],
      headings: { en: "¿Qué has aprendido hoy?" },
      contents: { en: "No rompas tu racha. ¡Registra tu aprendizaje del día!" },
      name: "daily_reminder"
    })
  });

  const result = await response.json();
  console.log(`Notificación enviada a ${user.name}:`, result);
};

(async () => {
  for (const user of USERS) {
    await sendNotification(user);
  }
})();
