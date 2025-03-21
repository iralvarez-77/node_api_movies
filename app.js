import express from 'express';
import cookieParser from 'cookie-parser'
import authRouterV1 from './routes/auth.routes.js'
import moviesRouterV1 from './routes/movies.routes.js'
import episodesRouterV1 from './routes/episodes.routes.js'
import directorsRouterV1 from './routes/directors.routes.js'
import { sentError } from './utils/sentError.js';
// import { authRequired } from './middlewares/authRequired.js';
import requiredHeaderToken from "./middlewares/requiredHeadersToken.js"


const app = express();
app.disable('x-powered-by');

app.use(express.json());
app.use (cookieParser())

app.use('/api/v1', authRouterV1)
app.use('/api/v1', requiredHeaderToken, moviesRouterV1)
app.use('/api/v1',directorsRouterV1)
app.use('/api/v1', episodesRouterV1)

app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500; 
  const message = err.message || "Internal Server Error";
  sentError(res, statusCode, message)
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

