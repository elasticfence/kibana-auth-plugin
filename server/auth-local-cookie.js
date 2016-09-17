module.exports = function (server) {
  const users = {};
  (process.env.LOCAL_AUTH_LOGINS || 'admin:admin').split(',').forEach(function (kv) {
    var toks = kv.split(':');
    users[toks[0]] = toks[1];
  });

  const login = function (request, reply) {

    if (request.auth.isAuthenticated) {
      return reply.redirect('/');
    }

    var message;
    var username;
    var password;

    if (request.method === 'post') {
      username = request.payload.username;
      password = request.payload.password;
    } else if (request.method === 'get') {
      username = request.query.username;
      password = request.query.password;
    }
    var checked = username && users[username] === password;
    if (username || password) {
      if (!checked) {
        message = 'Invalid username or password';
      }
    } else if (request.method === 'post') {
      message = 'Missing username or password';
    }
    if (!checked) {
      return reply('<html><head><title>Login page</title></head><body>'
          + (message ? '<h3>' + message + '</h3><br/>' : '')
          + '<form method="get" action="/login">'
          + 'Username: <input type="text" name="username"><br>'
          + 'Password: <input type="password" name="password"><br/>'
          + '<input type="submit" value="Login"></form></body></html>');
    }
    var uuid = 1;
    const sid = String(++uuid);
    request.server.app.cache.set(sid, { username: username }, 0, (err) => {

      if (err) {
        reply(err);
      }

      request.auth.session.set({ sid: sid });
      return reply.redirect('/');
    });
  };

  const logout = function (request, reply) {
    request.auth.session.clear();
    return reply.redirect('/');
  };

  server.register(require('hapi-auth-cookie'), (err) => {

    if (err) {
      throw err;
    }

    const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
    server.app.cache = cache;

    server.auth.strategy('session', 'cookie', true, {
      password: 'secret',
      cookie: 'sid',
      redirectTo: '/login',
      isSecure: false,
      validateFunc: function (request, session, callback) {

        cache.get(session.sid, (err, cached) => {

          if (err) {
            return callback(err, false);
          }

          if (!cached) {
            return callback(null, false);
          }

          return callback(null, true, cached.username);
        });
      }
    });

    server.route([
      {
        method: ['GET', 'POST'],
        path: '/login',
        config: {
          handler: login,
          auth: { mode: 'try' },
          plugins: { 'hapi-auth-cookie': { redirectTo: false } }
        }
      },
      { method: 'GET', path: '/logout', config: { handler: logout } }
    ]);

  });
};
