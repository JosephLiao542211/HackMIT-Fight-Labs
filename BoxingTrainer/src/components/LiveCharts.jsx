import React, { useEffect } from 'react';
import { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const LiveChart = ({ isRecording, data, setData, punchfunction, punch }) => {
    useEffect(() => {
        if (!isRecording) return;

        const interval = setInterval(() => {
            const newVelocity = Math.floor(Math.random() * 1000); // Generate random velocity data
            const newDataPoint = {
                name: `${data.length}`,
                velocity: newVelocity,
            };

            setData((prevData) => {
                const updatedData = [...prevData, newDataPoint];

                if (newDataPoint.velocity > 500) {
                    punchfunction((punch += 1));
                }

                if (updatedData.length > 10) {
                    // Keep only the last 10 data points for performance
                    return updatedData.slice(-10);
                }
                return updatedData;
            });
        }, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [isRecording, data, setData]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="velocity" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LiveChart;
