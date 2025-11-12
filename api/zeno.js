export default async function handler(req, res) {
  try {
    // Endpoint alternativo de Zeno (funciona sin autenticación)
    const response = await fetch('https://public.api.zeno.fm/v2/metadata/nowplaying/lo1dx1b1e52tv');

    if (!response.ok) {
      throw new Error(`Error ${response.status} al conectar con Zeno`);
    }

    const data = await response.json();

    // Extraemos el título de la canción actual
    const nowPlaying =
      data?.data?.now_playing?.song?.text ||
      data?.data?.song ||
      "Desconocido";

    // Enviamos JSON limpio al frontend
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
