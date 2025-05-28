// keepAlive.js
const axios = require("axios");
const cron = require("node-cron");

// URL de tu backend FastAPI (ajústala si es diferente)
const FASTAPI_URL = "https://airvision-model-api.onrender.com"; // o tu URL pública si está desplegado

// Ejecutar cada 5 minutos
cron.schedule("*/5 * * * *", async () => {
  try {
    const res = await axios.get(FASTAPI_URL);
    console.log(`[PING] ${new Date().toISOString()} - Estado: ${res.status}`);
  } catch (error) {
    console.error(`[ERROR] ${new Date().toISOString()} - No se pudo hacer ping:`, error.message);
  }
});
