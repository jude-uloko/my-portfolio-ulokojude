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
    const rawIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'Unknown';
    const userIp = rawIp.split(',')[0].trim();

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