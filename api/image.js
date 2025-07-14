export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send("Missing 'url' query parameter.");
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(\`Failed to fetch image: \${response.statusText}\`);
    }

    const contentType = response.headers.get("content-type");
    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send(err.message);
  }
}