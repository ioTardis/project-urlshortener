# URL Shortener Microservice

This is a Node.js (with Express.js) small app that uses MongoDB which is part of the FCC Back End Certification. 
It listens POST requests with an URL in and sends back a JSON with original URL and shortened URL.
If API receive GET request with shortened URL it will redirect user to the original URL

## Example usage

```
POST https://project-urlshortener.iotardis.repl.co/api/shorturl - https://www.reddit.com/
https://project-urlshortener.iotardis.repl.co/api/shorturl/2
```

## Example output

```json
{"original_url":"https://www.reddit.com/","short_url":6}
```

## [Try it](https://project-urlshortener.iotardis.repl.co)
