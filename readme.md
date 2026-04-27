# Cache Lab

## Setup cd front

npm i
npm run dev

## Setup cd back

npm init -y
npm install express ioredis sqlite3

## Redis (Docker)

docker run -d -p 6379:6379 redis

## Run app

npm start

## Benchmark

npm install -g autocannon

# sin cache

autocannon -c 50 -d 10 http://localhost:3000/redis/data

# con cache

autocannon -c 50 -d 10 http://localhost:3000/redis/data-cache

# db sin cache

autocannon -c 50 -d 10 http://localhost:3000/redis/list

# db con cache

autocannon -c 50 -d 10 http://localhost:3000/redis/list-cache
