require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const authorizationMiddleware = require('./authorization-middleware');
const dayjs = require('dayjs');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

app.use(express.json());

app.use(staticMiddleware);

app.get('/api/games/gameList/:gameId/:userId', (req, res, next) => {
  const userId = req.params.userId;
  const gameId = req.params.gameId;
  const sql = `
    select "wantToPlay", "played"
    from "gameList"
    where "gameId" = $1 AND "userId" = $2
    `;
  const params = [gameId, userId];
  db.query(sql, params)
    .then(result => {
      const gameList = result.rows;
      res.status(200).json(gameList);
    })
    .catch(err => next(err));
});

app.get('/api/games/reviews/:gameId', (req, res, next) => {
  const gameId = parseInt(req.params.gameId, 10);
  if (!Number.isInteger(gameId) || gameId < 1) {
    res.status(400).json({
      error: 'gameId must be a positive integer'
    });
    return;
  }
  const sql = `
    select "details", "username"
    from "reviews"
    join "users" using ("userId")
    where "gameId" = $1
    `;
  db.query(sql, [gameId])
    .then(result => {
      const reviews = result.rows;
      res.status(200).json(reviews);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new ClientError(
      400,
      'username, email, & password are required fields'
    );
  }
  argon2.hash(password).then(hashedPassword => {
    const sql = `
      insert into "users" ("username", "email", "password")
      values ($1, $2, $3)
      returning *
      `;
    const params = [username, email, hashedPassword];
    db.query(sql, params)
      .then(result => {
        const [newUser] = result.rows;
        res.status(201).json(newUser);
      })
      .catch(err => next(err));
  });
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select u."userId", u."username", u."password", "token"
    from "users" as u
    left outer join "session" using ("userId")
    where "email" = $1
    `;
  const params = [email];
  db.query(sql, params).then(result => {
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    argon2
      .verify(user.password, password)
      .then(isMatching => {
        if (!isMatching) {
          throw new ClientError(401, 'invalid login');
        }
        const payload = {
          user: {
            userId: user.userId,
            username: user.username,
            email: email
          }
        };
        const newExpiration = dayjs()
          .add(3, 'hours')
          .format('YYYY-MM-DD HH:mm:ss');
        if (user.token) {
          const sql = `
            update "session"
            set "expiration" = $1
            where "token" = $2
            `;
          const params = [newExpiration, user.token];
          db.query(sql, params)
            .then(result => {
              const userInfo = Object.assign(user.token, payload);
              res.status(200).json(userInfo);
            })
            .catch(err => next(err));
        } else {
          const token = {
            token: jwt.sign(payload, process.env.TOKEN_SECRET)
          };
          const sql = `
            insert into "session" ("userId", "token", "expiration")
            values ($1, $2, $3)
            `;
          const params = [user.userId, token.token, newExpiration];
          db.query(sql, params)
            .then(result => {
              const userInfo = Object.assign(token, payload);
              res.status(200).json(userInfo);
            })
            .catch(err => next(err));
        }
      })
      .catch(err => next(err));
  })
    .catch(err => next(err));
});

app.post('/api/games/reviews', (req, res, next) => {
  const { gameId, gameTitle, details, userId } = req.body;
  if (!gameId || !gameTitle || !details || !userId) {
    throw new ClientError(400, 'Invalid gameID/Review/UserId');
  }
  const sql = `
    insert into "reviews" ("gameId", "gameTitle", "details", "userId")
    values ($1, $2, $3, $4)
    returning *
    `;
  const params = [gameId, gameTitle, details, userId];
  db.query(sql, params)
    .then(result => {
      const [review] = result.rows;
      res.status(201).json(review);
    })
    .catch(err => next(err));
});

app.post('/api/games/gameList', (req, res, next) => {
  const { userId, gameId, wantToPlay, played } = req.body;
  const sql =
    ' insert into "gameList" ("userId", "gameId", "wantToPlay", "played") values ($1, $2, $3, $4) returning * ';
  const params = [userId, gameId, wantToPlay, played];
  db.query(sql, params)
    .then(result => {
      const [list] = result.rows;
      res.status(201).json(list);
    })
    .catch(err => next(err));
});

app.patch('/api/games/gameList/:gameId/:userId', (req, res, next) => {
  const userId = req.params.userId;
  const gameId = req.params.gameId;
  const { wantToPlay, played } = req.body;
  if (!userId || !gameId || wantToPlay === undefined || played === undefined) {
    throw new ClientError(
      400,
      'userId, gameId, wantToPlay, played are required'
    );
  }
  const sql = `
    update "gameList"
       set "wantToPlay" = $1,
           "played" = $2
     where "gameId" = $3 AND "userId" = $4
     returning "wantToPlay", "played"
     `;
  const params = [wantToPlay, played, gameId, userId];
  db.query(sql, params)
    .then(result => {
      const [list] = result.rows;
      res.status(201).json(list);
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.get('/api/games/reviews', (req, res, next) => {
  const userId = req.user.user.userId;
  if (!userId) {
    throw new ClientError(400, 'invalid user');
  }
  const sql = `
    select "gameTitle", "details"
    from "reviews"
    where "userId" = $1
    `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const reviews = result.rows;
      res.status(200).json(reviews);
    })
    .catch(err => next(err));
});

app.delete('/api/users/session', (req, res, next) => {
  const userId = req.user.user.userId;
  if (!userId) {
    throw new ClientError(400, 'invalid user');
  }
  const sql = `
    delete from "session"
    where "userId" = $1
    `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.sendStatus(204);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
