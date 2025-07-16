# Pyro_Middleware
Middleware for modifying pyroscope data prior to visualization.

Goal is to transform pyroscope data prior to displaying by Grafana. Grafana will connect but is not accepting the modified JSON.  
Currently only works on the pyroscope UI (directly accessed via localhost:4242, unmodified profiles still accessibly on localhost:4040)

To install:
$ npm init -y

To run:
$ npm run dev
