# get-my-bill

Docker service that generates PDF from HTML

```
$ docker build -t get-my-bill:latest .
$ docker compose up -d
```

Use it:

```
$ curl -X POST -H 'X-Page-Width: 210' -H 'X-Page-Height: 270' -H 'Content-Type: text/plain' localhost:3022 -d "@template.html" > doc.pdf
```
