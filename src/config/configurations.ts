export default () => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  database: {
    databaseURL: process.env.DATABASE_URL,
  },
});
