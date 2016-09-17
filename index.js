module.exports = function (kibana) {

  return new kibana.Plugin({
    name: 'kibana-auth-plugin',
    require: ['kibana', 'elasticsearch'],
    uiExports: {
      app: {
        title: 'Kibana Auth Plugin',
        description: 'Homemade authentication for Kibana',
        main: 'plugins/kibana-auth-plugin/app'
      },
      chromeNavControls: ['plugins/kibana-auth-plugin/logout']
    },

    config: function (Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init: function (server, options) {
      require('./server/auth-local-cookie')(server, options);
    }

  });
};
