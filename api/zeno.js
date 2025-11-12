export default async function handler(req, res) {
  try {
    // Endpoint oficial de Zeno con tu mountpoint
    const response = await fetch('https://api.zeno.fm/stations/lo1dx1b1e52tv');

    if (!response.ok) {
      throw new Error(`Error ${response.status} al conectar con Zeno`);
    }

    const data = await response.json();

    // Extraemos la parte que tiene la canción actual
    const nowPlaying = data?.now_playing?.text || data?.live_metadata?.now_playing || "Desconocido";

    // Enviamos la respuesta limpia
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ now_playing: nowPlaying });
  } catch (error) {
    res.status(500).json({
      error: "No se pudieron obtener metadatos desde Zeno.fm",
      details: error.message,
    });
  }
}
