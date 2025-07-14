export default async function handler(req, res) {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.status(400).send('Missing "url" parameter');

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Image fetch failed');

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const contentType = response.headers.get('content-type') || 'image/png';

    res.setHeader('Content-Type', 'application/json');
    res.send({
      base64: `data:${contentType};base64,${base64}`,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
