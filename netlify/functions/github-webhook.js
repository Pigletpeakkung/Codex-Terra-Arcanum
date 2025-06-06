const crypto = require('crypto');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Verify webhook signature
    const signature = event.headers['x-hub-signature-256'];
    const secret = process.env.GITHUB_WEBHOOK_SECRET;
    
    if (secret && signature) {
      const expectedSignature = 'sha256=' + crypto
        .createHmac('sha256', secret)
        .update(event.body)
        .digest('hex');
      
      if (signature !== expectedSignature) {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: 'Invalid signature' })
        };
      }
    }

    // Parse the webhook payload
    const payload = JSON.parse(event.body);
    const { action, repository, pusher, commits } = payload;

    console.log('Webhook received:', {
      repository: repository?.name,
      pusher: pusher?.name,
      commits: commits?.length || 0
    });

    // Handle different events
    switch (event.headers['x-github-event']) {
      case 'push':
        return await handlePushEvent(payload);
      case 'pull_request':
        return await handlePullRequestEvent(payload);
      case 'release':
        return await handleReleaseEvent(payload);
      default:
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Event received but not handled' })
        };
    }

  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

async function handlePushEvent(payload) {
  const { repository, pusher, commits, ref } = payload;
  
  // Only handle pushes to main branch
  if (ref !== 'refs/heads/main') {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Push to non-main branch ignored' })
    };
  }

  // Log deployment info
  console.log(`Deployment triggered by ${pusher.name} with ${commits.length} commits`);

  // Optional: Send notification
  await sendDeploymentNotification({
    repository: repository.name,
    pusher: pusher.name,
    commits: commits.length,
    message: commits[0]?.message || 'No commit message'
  });

  // Optional: Trigger additional actions
  await triggerAdditionalActions(payload);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Push event processed successfully',
      repository: repository.name,
      commits: commits.length
    })
  };
}

async function handlePullRequestEvent(payload) {
  const { action, pull_request, repository } = payload;
  
  console.log(`PR ${action}: ${pull_request.title} in ${repository.name}`);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Pull request ${action} processed`,
      pr_number: pull_request.number
    })
  };
}

async function handleReleaseEvent(payload) {
  const { action, release, repository } = payload;
  
  if (action === 'published') {
    console.log(`New release: ${release.tag_name} in ${repository.name}`);
    
    // Optional: Send release notification
    await sendReleaseNotification({
      repository: repository.name,
      tag: release.tag_name,
      name: release.name,
      url: release.html_url
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Release ${action} processed`,
      tag: release.tag_name
    })
  };
}

async function sendDeploymentNotification({ repository, pusher, commits, message }) {
  // Example: Send to Slack, Discord, or email
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🚀 Deployment triggered for ${repository}`,
        attachments: [{
          color: 'good',
          fields: [
            { title: 'Pushed by', value: pusher, short: true },
            { title: 'Commits', value: commits.toString(), short: true },
            { title: 'Latest commit', value: message, short: false }
          ]
        }]
      })
    });
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
}

async function sendReleaseNotification({ repository, tag, name, url }) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🎉 New release published for ${repository}`,
        attachments: [{
          color: '#36a64f',
          fields: [
            { title: 'Version', value: tag, short: true },
            { title: 'Release Name', value: name, short: true },
            { title: 'URL', value: url, short: false }
          ]
        }]
      })
    });
  } catch (error) {
    console.error('Failed to send release notification:', error);
  }
}

async function triggerAdditionalActions(payload) {
  // Example: Clear cache, update database, etc.
  try {
    // Clear CDN cache
    if (process.env.CLOUDFLARE_API_TOKEN) {
      await clearCloudflareCache();
    }

    // Update analytics
    await updateDeploymentAnalytics(payload);

  } catch (error) {
    console.error('Additional actions failed:', error);
  }
}

async function clearCloudflareCache() {
  // Implementation for Cloudflare cache clearing
  console.log('Cache clearing triggered');
}

async function updateDeploymentAnalytics(payload) {
  // Track deployment in your analytics
  console.log('Analytics updated');
}
