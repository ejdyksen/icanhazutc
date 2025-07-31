import htmlContent from './index.html';

export default {
  async fetch(request, env, ctx) {
    const acceptHeader = request.headers.get('Accept') || '';

    // If client explicitly accepts HTML, give them the dynamic version
    // Otherwise default to plain text (for curl, etc.)
    const wantsHtml = acceptHeader.includes('text/html');

    if (!wantsHtml) {
      const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ") + " UTC";
      return new Response(currentTime + '\n', {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=0',
        },
      });
    }

    // For HTML requests, inject current time into noscript
    const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ") + " UTC";
    const htmlWithTime = htmlContent.replace(
      '<noscript><pre>JavaScript required</pre></noscript>',
      `<noscript><pre>${currentTime}</pre></noscript>`
    );

    return new Response(htmlWithTime, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=0',
      },
    });
  },
};
