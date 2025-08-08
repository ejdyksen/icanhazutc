import htmlContent from "./index.html";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/robots.txt") {
      return new Response("User-agent: *\nDisallow: /", {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }

    const validPaths = ["/", "/iso", "/rfc", "/unix"];
    if (!validPaths.includes(url.pathname)) {
      return new Response(null, { status: 404 });
    }

    const acceptHeader = request.headers.get("Accept") || "";
    const clientWantsHtml = acceptHeader.includes("text/html");

    // Single Date.now() call for consistency
    const serverTimeMs = Date.now();
    const serverDate = new Date(serverTimeMs);
    
    // Format based on path
    let currentTime;
    if (url.pathname === "/iso" || url.pathname === "/rfc") {
      currentTime = serverDate.toISOString().slice(0, 19) + "Z";
    } else if (url.pathname === "/unix") {
      currentTime = Math.floor(serverTimeMs / 1000).toString();
    } else {
      // Default human-readable format
      currentTime = serverDate.toISOString().slice(0, 19).replace("T", " ");
    }

    if (!clientWantsHtml) {
      return new Response(currentTime + "\n", {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }

    // Triple replacement: main pre tag, noscript fallback, and JS variable
    const htmlWithTime = htmlContent
      .replace('<pre id="t"></pre>', `<pre id="t">${currentTime}</pre>`)
      .replace(
        "<noscript><pre>JavaScript required</pre></noscript>",
        `<noscript><pre>${currentTime}</pre></noscript>`
      )
      .replace("let SERVER_TIME_MS=0", `const SERVER_TIME_MS=${serverTimeMs}`);

    return new Response(htmlWithTime, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=30, s-maxage=30",
      },
    });
  },
};
