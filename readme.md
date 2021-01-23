STEP TO RUN
requirement
1. docker & docker-compose
2. docker-compose up 
3. create database via adminer name: mydb http://localhost:15084/
4. docker exec -it api db-migrate up
5. docker exec -it api db-migrate --migrations-dir "seeders" up
6. docker exec -it api npm run test
6. app run in port .env API_PORT