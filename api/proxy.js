// Vercel Serverless Function: Proxy to game server API
// Routes: /api/proxy/* → http://in2.primenodes.in:19145/api/*

export default async function handler(req, res) {
  // Extract target path from query (passed via rewrite /api/proxy?path=...)
  const { path } = req.query;
  const targetPath = Array.isArray(path) ? path.join('/') : (path || '');
  
  // Build target URL
  const targetUrl = `http://in2.primenodes.in:19145/api/${targetPath}`;
  
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

  const fetchOptions = {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'AlooSMP-Web/1.0',
    },
  };

  if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
    fetchOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
  }

  // Retry up to 2 times on connection hiccups / ECONNRESET
  let lastError = null;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetch(url.toString(), fetchOptions);
      const data = await response.text();

      res.setHeader('Content-Type', response.headers.get('content-type') || 'application/json');
      res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
      return res.status(response.status).send(data);
    } catch (error) {
      lastError = error;
      if (attempt < 2) {
        await new Promise(r => setTimeout(r, 200));
      }
    }
  }

  console.error('[API Proxy Error]', lastError?.message);
  return res.status(502).json({
    error: 'Backend server unreachable',
    message: lastError?.message || 'Unknown error',
  });
}
