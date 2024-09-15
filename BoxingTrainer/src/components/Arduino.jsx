import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Arduino() {
  const [accelData, setAData] = useState([{ name: '0', velocity: 0 }]);
  const [rollData, setRData] = useState([{ name: '0', roll: 0 }]);
  const [pitch, setPitch] = useState(0);
  const [yaw, setYaw] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onmessage = (event) => {
      const data = event.data;
      console.log('Received from Arduino:', data);

      // Parse the data string
      const pitchMatch = data.match(/Pitch: ([-\d.]+)/);
      const yawMatch = data.match(/Yaw: ([-\d.]+)/);
      const accelMatch = data.match(/Acceleration: ([\d.]+)m\/s\^2/);

      if (pitchMatch) setPitch(parseFloat(pitchMatch[1]));
      if (yawMatch) setYaw(parseFloat(yawMatch[1]));

      if (accelMatch) {
        const accel = parseFloat(accelMatch[1]);
        setAData(prevData => {
          const newData = [...prevData, { name: prevData.length.toString(), velocity: accel }];
          return newData.slice(-1000); // Keep only the last 10 data points
        });
      }

      // For this example, we'll use the pitch as a stand-in for roll data
      if (pitchMatch) {
        const roll = parseFloat(pitchMatch[1]);
        setRData(prevData => {
          const newData = [...prevData, { name: prevData.length.toString(), roll: roll }];
          return newData.slice(-1000); // Keep only the last 10 data points
        });
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="App">
      <h1>Arduino Data Stream</h1>
      <div>
        <h2>Current Values</h2>
        <p>Pitch: {pitch.toFixed(2)}</p>
        <p>Yaw: {yaw.toFixed(2)}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ width: '45%', height: 300 }}>
          <h2>Acceleration Data</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={accelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="velocity" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ width: '45%', height: 300 }}>
          <h2>Roll Data</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rollData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="roll" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Arduino;