require('dotenv/config');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

app.use(express.json());

app.use(staticMiddleware);

app.post('/api/games/reviews', (req, res, next) => {
  const { gameId, details, userId } = req.body;
  if (!gameId || !details || !userId) {
    throw new ClientError(400, 'Invalid gameID/Review/UserId');
  }
  const sql = `
    insert into "reviews" ("gameId", "details", "userId")
    values ($1, $2, $3)
    returning *
    `;
  const params = [gameId, details, userId];
  db.query(sql, params)
    .then(result => {
      const [review] = result.rows;
      res.status(201).json(review);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
