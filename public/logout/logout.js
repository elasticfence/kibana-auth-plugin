require('ui/registry/chrome_nav_controls').register(function () {
  return {
    name: 'logout',
    order: 1000,
    template: require('plugins/kibana-auth-plugin/logout/logout.html')
  };
});
