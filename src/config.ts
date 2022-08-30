import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbDatabase: process.env.DB_DATABASE,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || 10
};
