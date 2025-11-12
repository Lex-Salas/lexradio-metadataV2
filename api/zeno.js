import http from "http";

export default async function handler(req, res) {
  try {
    const options = {
      host: "stream.zeno.fm",
      path: "/lo1dx1b1e52tv/metadata",
      port: 80,
      method: "GET",
    };

    const request = http.request(options, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        const cleaned = data.trim();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ now_playing: cleaned });
      });
    });

    request.on("error", (error) => {
      res.status(500).json({ error: "Error al conectar con Zeno.fm", details: error.message });
    });

    request.end();
  } catch (error) {
    res.status(500).json({
      error: "Fallo interno al obtener los metadatos",
      details: error.message,
    });
  }
}
