export default async function handler(req, res) {
  try {
    const r = await fetch('https://api.zeno.fm/mounts/metadata/iqom6dgpir8vv');
    const data = await r.json();

    // Permitir acceso desde cualquier origen
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: 'No se pudo obtener metadatos',
      details: err.message
    });
  }
}
