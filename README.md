Authentication module for Kibana 4
==================================

Simplistic authentication for Kibana 4.
Please use Elastics's Shield for a supported product.

Or wait for progress to land in Kibana: https://github.com/elastic/kibana/issues/3904

Usage:
```
bin/kibana plugin --install kibana-auth-plugin -u https://github.com/hmalphettes/kibana-auth-plugin/archive/master.tar.gz
npm i hapi-auth-cookie
LOCAL_AUTH_LOGINS=admin/password,foo:bar bin/kibana
```

Help wanted:

- cleaner install
- google oauth and others.

Weaker than hoped for - more help wanted:

- form submitted via a GET ( a POST fails due to xrcf defenses in kibana )
- installation of the hapi-auth-cookie does not happen when the plugin is installed

License: MIT.
