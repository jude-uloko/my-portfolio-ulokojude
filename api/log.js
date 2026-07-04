// A simple local memory cache to keep track of recent IP hits
const localRequestHistory = new Map();

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

    const { path, ua } = bodyData;

    // Secure Patch: Use Vercel's edge-verified IP header to prevent header spoofing
    const rawIp = req.headers['x-vercel-forwarded-for'] || req.headers['x-real-ip'] || 'Unknown';
    const userIp = rawIp.split(',')[0].trim();

    // --- RATE LIMIT BOUNCER START ---
    const now = Date.now();
    if (localRequestHistory.has(userIp)) {
      const lastVisitTime = localRequestHistory.get(userIp);
      
      // If this specific verified IP hits the API again in less than 5 seconds, reject it!
      if (now - lastVisitTime < 5000) {
        return res.status(429).json({ error: 'Too many requests. Slow down!' });
      }
    }

    // Record the current time for this IP address
    localRequestHistory.set(userIp, now);

    // Keep memory clean: if the list gets too large, wipe it to keep it lightweight
    if (localRequestHistory.size > 1000) {
      localRequestHistory.clear();
    }
    // --- RATE LIMIT BOUNCER END ---

    const googleResponse = await fetch(GOOGLE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: SECRET_TOKEN,
        path: path || '/',
        ua: ua || 'Unknown',
        ip: userIp
      })
    });

    const resultText = await googleResponse.text();
    return res.status(200).send(resultText);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}