export default async function handler(req, res) {
  try {
    // Petición directa al endpoint de metadatos de Zeno.fm
    const response = await fetch('https://api.zeno.fm/mounts/metadata/iqom6dgpir8vv');
    
    if (!response.ok) {
      throw new Error(`Error de conexión: ${response.status}`);
    }

    const data = await response.json();

    // Permitir acceso desde cualquier dominio
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Devolver los metadatos en formato JSON
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: 'No se pudieron obtener los metadatos desde Zeno.fm',
      details: error.message,
    });
  }
}
