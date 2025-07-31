import htmlContent from './index.html';

export default {
  async fetch(request, env, ctx) {
    const acceptHeader = request.headers.get('Accept') || '';
    const userAgent = request.headers.get('User-Agent') || '';

    // Check if client prefers plain text
    const wantsPlainText = acceptHeader.includes('text/plain') && !acceptHeader.includes('text/html');

    if (wantsPlainText) {
      const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ") + " UTC";
      return new Response(currentTime, {
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
