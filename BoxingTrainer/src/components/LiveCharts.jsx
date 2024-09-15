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
    // Limit the data to 1000 points
    const maxDataPoints = 1000;
    const filteredData = data.slice(-maxDataPoints);

    // Effect to monitor the velocity and call punchfunction when velocity < 6
    useEffect(() => {
        // Check the last data point's velocity
        if (filteredData.length > 0) {
            const lastDataPoint = filteredData[filteredData.length - 1];
            if (lastDataPoint.velocity > 13) {
                punchfunction(punch + 1); // Increment punch count
            }
        }
    }, [filteredData, punch, punchfunction]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={filteredData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                {/* Hide the XAxis ticks by setting tick={false} */}
                <XAxis tick={false} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="velocity" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LiveChart;
