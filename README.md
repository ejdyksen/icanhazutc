# icanhazutc

The current time, in UTC. In the spirit of [icanhazip](https://icanhazip.com).

## Features

- Shows the current UTC time
- Light mode/dark mode support
- The time pauses if you select it
- If your local machine is > 60 seconds off of the server time, displays a warning
- Alternative formats:
   - [ISO 8601](https://icanhazutc.com/iso)/[RFC 3339](https://icanhazutc.com/rfc) (the same in this project)
   - [unix time](https://icanhazutc.com/unix) (though this isn't [technically](https://en.wikipedia.org/wiki/Unix_time) UTC time)
- `<noscript>` support, just showing the server time
- `curl` support:

```bash
$ curl https://icanhazutc.com
2015-10-21 07:28:55

$ curl https://icanhazutc.com/iso
2015-10-21T07:28:55Z
```

## Caveats

- This only displays your machine's time. This is not meant to be a time synchronization service.
