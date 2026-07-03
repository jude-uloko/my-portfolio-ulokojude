export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const GOOGLE_URL = process.env.APPS_SCRIPT_URL;
    const SECRET_TOKEN = process.env.VISIT_LOG_TOKEN;

    let bodyData = req.body;
    if (typeof bodyData === 'string') {
      bodyData = JSON.parse(bodyData);
    }

    // 1. Unpack only path and ua from the browser body payload
    const { path, ua } = bodyData;

    // 2. Extract the real IP directly from Vercel's secure request headers
    // Vercel populates 'x-forwarded-for' with the real visitor's IP address.
    const rawIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'Unknown';
    
    // If x-forwarded-for contains a chain of proxies (e.g. "IP1, IP2"), grab the first one
    const userIp = rawIp.split(',')[0].trim();

    // 3. Forward the verified data array to Google Sheets
    const googleResponse = await fetch(GOOGLE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: SECRET_TOKEN,
        path: path || '/',
        ua: ua || 'Unknown',
        ip: userIp // Sent securely from the backend
      })
    });

    const resultText = await googleResponse.text();
    return res.status(200).send(resultText);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}