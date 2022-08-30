# URL Shortener Microservice

This is a Node.js (with Express.js) small app that uses MongoDB which is part of the FCC Back End Certification. 
It listens POST requests with an URL in and sends back a JSON with original URL and shortened URL.
If API recieve GET request with shortertened URL it will redirect user to the original URL

## Example usage

```
https://project-urlshortener.iotardis.repl.co/api/shorturl/https://www.freecodecamp.org/
https://project-urlshortener.iotardis.repl.co/api/shorturl/2
```

## Example output

```
{"original_url":"https://www.reddit.com/","short_url":6}
```

## [Try it](https://project-urlshortener.iotardis.repl.co)
