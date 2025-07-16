import express from 'express';
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';

const app = express();
const target = 'http://localhost:4040';

/*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // or restrict to Grafana origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use('/', createProxyMiddleware({
  target,
  changeOrigin: true,
  selfHandleResponse: true, // Enables manual response handling
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[INCOMING] ${req.method} ${req.originalUrl} -> Received on port 4242`);
    console.log(`[FORWARDING] ${req.method} ${req.originalUrl} -> Forwarding to port 4040`);
  },
  onProxyRes: async (proxyRes, req, res) => {
    let body = Buffer.from([]);

    // Accumulate response data
    proxyRes.on('data', chunk => {
      body = Buffer.concat([body, chunk]);
    });
    
    proxyRes.on('end', () => {
      // Modify the response here
      let responseBody = body.toString('utf8');

      // Example modification: append a note to any text response
      if (proxyRes.headers['content-type']?.includes('application/json')) {
        try {
          const json = JSON.parse(responseBody);
          if(json.flamebearer) json.flamebearer.names = json.flamebearer.names.map(() => 'MINE')
          responseBody = JSON.stringify(json);
        } catch (err) {
          console.error('Failed to parse JSON:', err);
        }
      } else {
        responseBody;
      }
      console.log("Response given:", proxyRes)
      // Set headers and return modified body
      res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
      res.end(responseBody);
    });
  }
}));

app.listen(4242, () => {
  console.log('Proxy server listening on port 4242');
});

/*/
app.use('/', createProxyMiddleware({
  target,
  changeOrigin: true,
  selfHandleResponse: true,
  logLevel: 'silent', // suppress internal proxy logs
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[PROXY] ${req.method} ${req.originalUrl} → ${target}`);
  },
  on: {
    proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
      let responseBody = responseBuffer.toString('utf8'); // convert buffer to string
      console.log('Incoming:\n\n------------------------------------', responseBody);
      if (proxyRes.headers['content-type']?.includes('application/json')) {
        try {
          let json = JSON.parse(responseBody);
          if(json.flamebearer) json.flamebearer.names = json.flamebearer.names.map(() => 'Vispyr')
          responseBody = JSON.stringify(json);
        } catch (err) {
          console.error('Failed to parse JSON:', err);
        }
      } else {
        responseBody;
      }
      
      console.log("Response given: \n\n------------------------------", responseBody)
      return responseBody;
    }),
  },
  
}));

app.listen(4242, () => {
  console.log('Pyroscope middleware listening on http://localhost:4242 (→ 4040)');
});
/**/