import express from 'express';
import cookieParser from 'cookie-parser'
import authRouterV1 from './routes/auth.routes.js'
import moviesRouterV1 from './routes/movies.routes.js'
import episodesRouterV1 from './routes/episodes.routes.js'
import directorsRouterV1 from './routes/directors.routes.js'
// import { authRequired } from './middlewares/authRequired.js';


const app = express();
app.disable('x-powered-by');

app.use(express.json());
app.use (cookieParser())

app.use('/api/v1', authRouterV1)
app.use('/api/v1', moviesRouterV1)
app.use('/api/v1', directorsRouterV1)
app.use('/api/v1', episodesRouterV1)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

