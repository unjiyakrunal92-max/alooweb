// Vercel Serverless Function: Proxy to game server API
// Routes: /api/proxy/* → http://premium-01.gladbyte.in:25841/api/*

export default async function handler(req, res) {
  // Extract the path segments after /api/proxy/
  const { path } = req.query;
  const targetPath = Array.isArray(path) ? path.join('/') : (path || '');
  
  // Build target URL
  const targetUrl = `http://premium-01.gladbyte.in:25841/api/${targetPath}`;
  
  // Forward query string (except 'path' which is the catch-all param)
  const url = new URL(targetUrl);
  Object.entries(req.query).forEach(([key, value]) => {
    if (key !== 'path') {
      url.searchParams.set(key, value);
    }
  });

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AlooSMP-Web/1.0',
      },
    };

    // Forward body for non-GET requests
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(url.toString(), fetchOptions);
    const data = await response.text();

    // Forward status code and content type
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/json');
    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
    return res.status(response.status).send(data);
  } catch (error) {
    console.error('[API Proxy Error]', error.message);
    return res.status(502).json({
      error: 'Backend server unreachable',
      message: error.message,
    });
  }
}
