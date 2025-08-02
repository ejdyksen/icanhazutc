import htmlContent from './index.html';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/robots.txt') {
      return new Response('User-agent: *\nDisallow: /', {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    }

    if (url.pathname !== '/') {
      return new Response(null, { status: 404 });
    }

    const acceptHeader = request.headers.get('Accept') || '';
    const clientWantsHtml = acceptHeader.includes('text/html');

    // Single Date.now() call for consistency
    const serverTimeMs = Date.now();
    const currentTime = new Date(serverTimeMs).toISOString().slice(0, 19).replace("T", " ") + " UTC";

    if (!clientWantsHtml) {
      return new Response(currentTime + '\n', {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    }

    // Single pass replacement with both modifications
    const htmlWithTime = htmlContent
      .replace('<noscript><pre>JavaScript required</pre></noscript>',
               `<noscript><pre>${currentTime}</pre></noscript>`)
      .replace('const SERVER_TIME_MS=0', `const SERVER_TIME_MS=${serverTimeMs}`);

    return new Response(htmlWithTime, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=30, s-maxage=30',
      },
    });
  },
};
