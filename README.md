Authentication module for Kibana 4
==================================

Simplistic authentication for Kibana 4.
Please use Elastics's Shield for a supported product.

Or wait for progress to land in Kibana: https://github.com/elastic/kibana/issues/3904

<img src="https://cloud.githubusercontent.com/assets/1423657/18619991/c47b632e-7e09-11e6-9eff-7b8324ad04c6.png"/>

Usage:
```
bin/kibana plugin --install kibana-auth-plugin -u https://github.com/elasticfence/kibana-auth-plugin/releases/download/0.1.1/kauth-latest.tar.gz

LOCAL_AUTH_LOGINS=admin:password,foo:bar bin/kibana
```

Docker container
```
docker run --detach --name kibana -e LOCAL_AUTH_LOGINS=admin:password --net=host hmalphettes/kibana-auth
```

Help wanted:

- cleaner install
- google oauth and others.

Weaker than hoped for - more help wanted:

- form submitted via a GET ( a POST fails due to xrcf defenses in kibana )
- installation of the hapi-auth-cookie does not happen when the plugin is installed

License: MIT.
