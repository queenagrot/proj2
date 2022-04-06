module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '921ab90b0472e552ab5036311315430e'),
  },
});
