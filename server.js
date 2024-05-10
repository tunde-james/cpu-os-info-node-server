const http = require('node:http');
const os = require('node:os');

// Function to simulate asynchronous operation with random delay
function asyncOperation(callback) {
  const delay = Math.floor(Math.random() * 3000) + 1000;
  setTimeout(() => {
    callback();
  }, delay);
}

// Create HTTP server
const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'GET' && req.url === '/os-info') {
    // Delay between 0-3 seconds
    asyncOperation(() => {
      // Get CPU and OS information
      const cpuInfo = os.cpus();
      const totalMemory = os.totalmem();
      const freeMemory = os.freemem();

      const osInfo = {
        platform: os.platform(),
        arch: os.arch(),
        osType: os.type(),
        osRelease: os.release(),
        osMachine: os.machine(),
        osUptime: os.uptime(),
        cpuModel: cpuInfo[0].model,
        cpuSpeed: `${cpuInfo[0].speed} Mhz`,
        totalMemory: `${(totalMemory / (1024 * 1024)).toFixed(2)} MB`,
        freeMemory: `${(freeMemory / (1024 * 1024)).toFixed(2)} MB`,
      };

      // Respond with CPU and OS information
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(osInfo));
    });
  } else {
    // Handle other routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start server
server.listen(8000, '127.0.0.1', () => {
  console.log('server is running at port: 8000');
});
