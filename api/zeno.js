export default async function handler(req, res) {
  const mountId = "lo1dx1b1e52tv"; // Tu ID de Zeno
  const endpoints = [
    `https://public.api.zeno.fm/v2/metadata/nowplaying/${mountId}`,
    `https://api.zeno.fm/mounts/metadata/${mountId}`,
    `https://stream.zeno.fm/${mountId}/metadata`
  ];

  try {
    let nowPlaying = null;

    for (const url of endpoints) {
      try {
        const r = await fetch(url);
        const contentType = r.headers.get("content-type") || "";
        const text = await r.text();

        if (r.ok && text) {
          // Si la respuesta es JSON válida
          if (contentType.includes("application/json")) {
            const data = JSON.parse(text);
            nowPlaying =
              data?.data?.now_playing?.song?.text ||
              data?.data?.now_playing?.text ||
              data?.streamTitle ||
              data?.song ||
              null;
          } else {
            // Si la respuesta es texto plano
            nowPlaying = text.trim();
          }
        }

        if (nowPlaying) break;
      } catch (e) {
        continue;
      }
    }

    if (!nowPlaying) {
      throw new Error("Zeno.fm no devolvió metadatos válidos.");
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ now_playing: nowPlaying });
  } catch (error) {
    res.status(500).json({
      error: "No se pudieron obtener metadatos desde Zeno.fm",
      details: error.message
    });
  }
}
