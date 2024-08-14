module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://gardenbros.sk'], // Replace with your frontend domain or IP
      headers: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    },
  },
  
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
