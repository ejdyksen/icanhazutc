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

    const acceptHeader = request.headers.get('Accept') || '';
    const clientWantsHtmls = acceptHeader.includes('text/html');

    const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ") + " UTC";

    if (!clientWantsHtmls) {
      return new Response(currentTime + '\n', {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    }

    // Make sure noscript has the real time
    const htmlWithTime = htmlContent.replace(
      '<noscript><pre>JavaScript required</pre></noscript>',
      `<noscript><pre>${currentTime}</pre></noscript>`
    );

    return new Response(htmlWithTime, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  },
};
