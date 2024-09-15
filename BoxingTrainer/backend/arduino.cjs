const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { SerialPort } = require('serialport');

const app = express();
const server = http.createServer(app);

app.use(express.static('build'));

const wss = new WebSocket.Server({ server });

// Function to attempt connection to a serial port
function connectToSerialPort(portPath) {
  return new Promise((resolve, reject) => {
    const port = new SerialPort({
      path: portPath,
      baudRate: 115200
    });

    port.on('error', (err) => {
      console.error(`Error on ${portPath}:`, err.message);
      reject(err);
    });

    port.on('open', () => {
      console.log(`Connected to ${portPath}`);
      resolve(port);
    });
  });
}

// Function to set up WebSocket for a given serial port
function setupWebSocket(port) {
  wss.on('connection', (ws) => {
    console.log('Client connected');

    port.on('data', (data) => {
      ws.send(data.toString());
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
}

// Main function to run the server
async function runServer() {
  try {
    // List available ports
    const ports = await SerialPort.list();
    console.log("Available ports:");
    ports.forEach((port) => {
      console.log(port.path);
    });

    // Try to connect to the first available port
    for (const port of ports) {
      try {
        const serialPort = await connectToSerialPort(port.path);
        setupWebSocket(serialPort);
        break; // Exit the loop if connection is successful
      } catch (err) {
        console.log(`Failed to connect to ${port.path}, trying next port...`);
      }
    }

  } catch (err) {
    console.error("Failed to list serial ports:", err);
  }

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

runServer();