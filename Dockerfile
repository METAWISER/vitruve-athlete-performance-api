
FROM node:20-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --silent
COPY .env ./
COPY . .
COPY src/shared/infrastructure/persistense/prisma prisma
RUN npm run prisma:generate
RUN npm run build
EXPOSE 3001
CMD [ "npm", "run", "start" ]
