import htmlContent from './index.html';

export default {
  async fetch(request, env, ctx) {
    return new Response(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  },
};
