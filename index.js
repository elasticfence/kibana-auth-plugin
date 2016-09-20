module.exports = function (kibana) {

  return new kibana.Plugin({
    name: 'kibana-auth-plugin',
    require: ['kibana', 'elasticsearch'],
    uiExports: {
      chromeNavControls: ['plugins/kibana-auth-plugin/logout/logout']
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
