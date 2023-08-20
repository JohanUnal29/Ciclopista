import express from 'express';
import path from 'path';
import compression from "express-compression";
import { __dirname } from "./config.js";
import { connectMongo } from "./utils/db.js";
import MongoStore from 'connect-mongo';
import productRouter from "./routes/product.router.js";
import mockingproducts from "./routes/mockingproducts.router.js"
import ticketsRouter from "./routes/tickets.router.js";
import { sessionGoogleRouter } from './routes/sessionGoogle.router.js';
import passport from 'passport';
import { iniPassport } from './utils/passport.config.js';
import session from 'express-session';
import cors from 'cors';
import { entorno } from './config.js';
import erroHandler from "./middlewares/error.js";

const app = express();
const port = entorno.PORT;
app.use(cors());

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

connectMongo();

// app.use(
//   compression({
//     brotli: { enabled: true, zlib: {} },
//   })
// );

// connectSocket(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    store: MongoStore.create({ mongoUrl: entorno.MONGO_URL, ttl: 86400 * 7 }),
    secret: 'un-re-secreto',
    resave: true,
    saveUninitialized: true,
  })
);

iniPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/products', productRouter);
app.use('/api/purchase', ticketsRouter);
app.use('/api/sessionsGoogle', sessionGoogleRouter);

app.use('/mockingproducts', mockingproducts);

app.get('*', (req, res) => {
  return res.status(404).json({
    status: 'error',
    msg: 'no encontrado',
    data: {},
  });
});

app.use(erroHandler);