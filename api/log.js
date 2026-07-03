export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 2. Grab your hidden secrets from Vercel's Environment Variables
    const GOOGLE_URL = process.env.APPS_SCRIPT_URL;
    const SECRET_TOKEN = process.env.VISIT_LOG_TOKEN;

    // SAFETY CHECK: Force-parse the body if it arrives as a raw string instead of an object
    let bodyData = req.body;
    if (typeof bodyData === 'string') {
      bodyData = JSON.parse(bodyData);
    }

    // 3. Extract the visit data sent from the browser safely
    const { path, ua, ip } = bodyData;

    // 4. Safely forward the data to Google Sheets from the server backend
    const googleResponse = await fetch(GOOGLE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: SECRET_TOKEN,
        path: path || '/',
        ua: ua || 'Unknown',
        ip: ip || 'Unknown'
      })
    });

    const resultText = await googleResponse.text();
    return res.status(200).send(resultText);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}