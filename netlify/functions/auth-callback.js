// netlify/functions/auth-callback.js
exports.handler = async (event, context) => {
  const { code } = event.queryStringParameters;
  
  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No authorization code provided' })
    };
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code
      })
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.access_token) {
      // Redirect to success page
      return {
        statusCode: 302,
        headers: {
          Location: '/?auth=success'
        }
      };
    } else {
      throw new Error('Failed to get access token');
    }

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Authentication failed' })
    };
  }
};
