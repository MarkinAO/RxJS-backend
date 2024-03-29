import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { faker } from '@faker-js/faker';

const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

function createRandomUser() {
  return {
      id: faker.string.uuid(),
    from: faker.internet.email(),
    subject: faker.lorem.words({ min: 1, max: 6 }),
    body: faker.lorem.words({ min: 1, max: 25 }),
    received: faker.date.past()
  };
}
app.get("/messages/unread", async (request, response) => {
  const count = Math.floor(Math.random() * 3);
  const messages = faker.helpers.multiple(createRandomUser, {
      count,
    });
  const result = {
    'status': 'ok',
    'timestamp': new Date(),
    messages
  }
  response.send(JSON.stringify(result)).end();
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;
const bootstrap = async () => {
  try {
    server.listen(port, () =>
      console.log(`Server has been started on http://localhost:${port}`)
    );
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
