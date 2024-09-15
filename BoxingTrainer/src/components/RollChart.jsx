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

const RollChart = ({ isRecording, data, setData }) => {
    // REPLACE WITH API TO ROLL FETCH DATA -JOSEPH

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
                <Line type="monotone" dataKey="roll" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default RollChart;
