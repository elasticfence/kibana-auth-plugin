FROM mhart/alpine-node
MAINTAINER hmalphettes@gmail.com

ENV KIBANA_VERSION 4.5.0

RUN apk add --update curl && \
  ( curl -Lskj https://download.elastic.co/kibana/kibana/kibana-${KIBANA_VERSION}-linux-x64.tar.gz | \
  gunzip -c - | tar xf - ) && \
  mv /kibana-$KIBANA_VERSION-linux-x64 /kibana && \
  rm -rf /kibana/node && \
  rm /kibana/bin/*.bat && \
  cd /kibana && \
  npm i hapi-auth-cookie && \
  bin/kibana plugin --install kibana-auth-plugin -u https://github.com/hmalphettes/kibana-auth-plugin/archive/master.tar.gz && \
  apk del curl && \
  rm -rfv /var/cache/apk/* /tmp/* /var/tmp/* /root/.npm

ENV LOCAL_AUTH_LOGINS=admin:password
EXPOSE 5601

CMD ["/kibana/bin/kibana"]
