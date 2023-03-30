export default () => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  database: {
    databaseURL: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    salt: process.env.HASH_SALT,
  },
});
