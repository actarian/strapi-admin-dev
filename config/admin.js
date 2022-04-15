module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'dba66e0b37b261848977938241a7f14b'),
  },
});
