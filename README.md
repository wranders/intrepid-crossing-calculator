# Instructions

Get Postgres running in a docker container, exec into it and use psql to generate a database.

```
docker run --name pg -e POSTGRES_PASSWORD=password1 -d -p 5432:5432 postgres
docker exec -it pg psql -U postgres
...
CREATE DATABASE irc;
\q
```

Build the image: 

```
docker build -t irc-calc .
```

Run the irc-calculator docker container like so:

```
docker run -d --name calc -p 80:4000 --link pg:pg -e PG_PASSWORD=password1 irc-calc
```

Throw nginx infront of it, or apache or whatever you want, tadaaaa. you're up and running.

# Things I didn't get around to,

Docker Compose file (im lazy and hooked into an existing pg instance)
Management page
Re-writing the item lookup to use SDE or use fuzzworks API, it's a lot of ESI calls
