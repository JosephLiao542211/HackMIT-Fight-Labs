// App.js (React)
import React, { useEffect } from 'react';

function Arduino() {
  useEffect(() => {
    // Create a WebSocket connection to the Node.js server
    const ws = new WebSocket('ws://localhost:3000');

    // Log incoming data from the Arduino to the console
    ws.onmessage = (event) => {
      console.log('Received from Arduino:', event.data);
    };

    // Cleanup on component unmount
    return () => ws.close();
  }, []);

  return (
    <div className="App">
      <h1>Arduino Data Stream</h1>
      <p>Check the console for live data.</p>
    </div>
  );
}

export default Arduino;
