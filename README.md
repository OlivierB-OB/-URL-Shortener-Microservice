Olivier BERNARD 's URL Shortener Microservice
===

User stories:

1.  I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
1.  I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
1.  When I visit that shortened URL, it will redirect me to my original link.

Example usage:

*  [https://ob-url-shortener-microservice.herokuapp.com/new/https://www.google.com](https://ob-url-shortener-microservice.herokuapp.com/new/https://www.google.com)
*  [https://ob-url-shortener-microservice.herokuapp.com/1](https://ob-url-shortener-microservice.herokuapp.com/1)

Example output:

*  { "original_url": "https://www.google.com", "short_url": "https://ob-url-shortener-microservice.herokuapp.com/1" }
*  { "error": "Invalid URL provided!" }
