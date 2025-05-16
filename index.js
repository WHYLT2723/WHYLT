const axios = require('axios');

// Configura tu clave de API y App ID de OneSignal
const ONESIGNAL_APP_ID = 'bc19e68c-dcdf-4187-8e5f-1c2ca891b3e2';
const ONESIGNAL_API_KEY = 'os_v2_app_xqm6ndg435aypds7dqwkrent4i4hicyziiju6uuiypkm45blgux5bmtnotjvtozyjxbq2kuiu7pfsvtecnxntfcvgde6giurrxokixy'; // Reemplaza con tu clave API REST

// Lista de usuarios a notificar
const usersToNotify = [
  { name: 'Laura' },
  { name: 'Pepe' },
  // Agrega más usuarios según sea necesario
];

// Función para enviar notificaciones
async function sendNotifications() {
  for (const user of usersToNotify) {
    try {
      const response = await axios.post(
        'https://onesignal.com/api/v1/notifications',
        {
          app_id: ONESIGNAL_APP_ID,
          include_external_user_ids: [user.name],
          headings: { en: 'Recordatorio' },
          contents: { en: '¡Hola! Este es tu recordatorio diario.' },
          url: 'https://whathaveyoulearnedtoday.com/', // Reemplaza con la URL de tu aplicación
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Basic ${ONESIGNAL_API_KEY}`,
          },
        }
      );
      console.log(`Notificación enviada a ${user.name}:`, response.data);
    } catch (error) {
      console.error(`Error al enviar notificación a ${user.name}:`, error.response?.data || error.message);
    }
  }
}

// Ejecutar la función
sendNotifications();

