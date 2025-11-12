export default async function handler(req, res) {
  try {
    // URL directa de Zeno para obtener texto plano con el título actual
    const response = await fetch("https://stream.zeno.fm/lo1dx1b1e52tv/metadata");
    const text = await response.text();

    // Limpieza básica del texto (por si viene con saltos de línea)
    const cleaned = text.trim();

    // Convertir a formato JSON simple
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ now_playing: cleaned });
  } catch (error) {
    res.status(500).json({
      error: "No se pudieron obtener los metadatos desde Zeno.fm",
      details: error.message,
    });
  }
}
