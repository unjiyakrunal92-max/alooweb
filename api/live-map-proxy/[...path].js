// Vercel Serverless Function: Proxy to Squaremap live map
// Routes: /live-map-proxy/* → http://163.61.39.244:25880/*

export default async function handler(req, res) {
  const { path } = req.query;
  const targetPath = Array.isArray(path) ? path.join('/') : (path || '');
  
  // Build target URL including query string
  const targetUrl = `http://163.61.39.244:25880/${targetPath}`;
  const url = new URL(targetUrl);
  Object.entries(req.query).forEach(([key, value]) => {
    if (key !== 'path') {
      url.searchParams.set(key, value);
    }
  });

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const response = await fetch(url.toString(), {
      method: req.method,
      headers: { 'User-Agent': 'AlooSMP-Web/1.0' },
    });

    const contentType = response.headers.get('content-type') || 'text/html';
    
    // For binary content (images, etc), forward as buffer
    if (contentType.includes('image') || contentType.includes('octet-stream')) {
      const buffer = await response.arrayBuffer();
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
      return res.status(response.status).send(Buffer.from(buffer));
    }
    
    // For text/JSON content
    const data = await response.text();
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
    return res.status(response.status).send(data);
  } catch (error) {
    console.error('[Map Proxy Error]', error.message);
    return res.status(502).json({
      error: 'Map server unreachable',
      message: error.message,
    });
  }
}
