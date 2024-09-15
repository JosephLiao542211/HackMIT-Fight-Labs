import React, { useState } from 'react';
import { useEffect } from 'react';

import LiveChart from './components/LiveCharts';
import RollChart from './components/RollChart';
import Stopwatch from './components/Stopwatch';
import AvgChart from './components/AvgpChart';

const PunchingDashboard = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const [isRecording, setIsRecording] = useState(false);
    const [pCount, setpCount] = useState(0);
    const [acceldata, setAData] = useState([{ name: '0', velocity: 0 }]);
    const [rolldata, setRData] = useState([{ name: '0', roll: 0 }]);
    const [avgdata, setAvgData] = useState([{ name: 0, value: 0 }]);

    const [fastest, setFastest] = useState(0);
    const [avg, setAvg] = useState(0.0); // Initialize avg with a default value

    useEffect(() => {
        // Whenever avg changes, add a new entry to avgdata
        setAvgData((prevData) => {
            const newDataPoint = {
                name: time, // Use the `time` state as the timestamp
                value: avg, // Use avg directly as a number
            };
            const updatedData = [...prevData, newDataPoint];

            if (updatedData.length > 10) {
                // Keep only the last 10 data points for performance
                return updatedData.slice(-10);
            }

            return updatedData;
        });
    }, [avg]); // Dependency array includes avg and time

    useEffect(() => {
        // Function to calculate avg
        const calculateAvg = () => {
            if (time > 0) {
                const minutes = Math.floor(time / 60);
                const sec = time % 60; // Remainder of seconds
                const newAvg = (pCount / (minutes + sec / 60)).toFixed(2); // Convert seconds to fraction of a minute
                setAvg(newAvg); // Update avg value
            } else {
                setAvg('N/A'); // Handle invalid time
            }
        };

        // Set interval to update avg every 100ms
        const interval = setInterval(() => {
            calculateAvg();
        }, 100);

        // Cleanup interval when the component unmounts
        return () => clearInterval(interval);
    }, [pCount, time]);

    // Initialize the timer hook

    // Handle start button click
    const handleStart = () => {
        setIsRunning(true);
        setIsRecording(true);
    };

    // Handle stop button click
    const handleStop = () => {
        setIsRunning(false);
        setIsRecording(false);
    };

    // Handle clear button click
    const handleClear = () => {
        setAData([{ name: '0', velocity: 0 }]);
        setpCount(0);
        // Reset the timer to zero
        setIsRecording(false);
        setIsRunning(false);
        setTime(0);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-3xl font-bold text-left mb-10">
                Punching Data Dashboard
            </h1>

            {/* Stopwatch Display */}
            <Stopwatch
                time={time}
                isRunning={isRunning}
                onStart={handleStart}
                onStop={handleStop}
                onReset={handleClear}
            />

            {/* Start, Stop, and Clear buttons */}
            <div className="mb-6">
                <button
                    onClick={handleStart}
                    className={`px-4 py-2 rounded-lg text-white ${
                        isRecording
                            ? 'bg-gray-400'
                            : 'bg-green-500 hover:bg-green-600'
                    }`}
                    disabled={isRecording}
                >
                    Start Recording
                </button>
                <button
                    onClick={handleStop}
                    className="ml-4 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                    Stop Recording
                </button>
                <button
                    onClick={handleClear}
                    className="ml-4 px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                >
                    Clear Data
                </button>
            </div>

            <div className="grid grid-cols-5 gap-6 mb-6">
                {/* Acceleration Graph (4/5 of the row) */}
                <div className="col-span-4 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Acceleration</h2>
                    <div className="h-60 bg-gray-200 flex justify-center items-center">
                        <LiveChart
                            isRecording={isRecording}
                            data={acceldata}
                            punch={pCount}
                            punchfunction={setpCount}
                            setData={setAData}
                        />
                    </div>
                </div>

                {/* Punch Counter (1/5 of the row) */}
                <div className="col-span-1 bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center">
                    <h2 className="text-xl font-semibold mb-4">Punches</h2>
                    <div className="text-4xl font-bold text-gray-700">
                        {pCount}
                    </div>
                </div>
            </div>

            {/* Second Row: 50/50 split for Punches and Hand Height */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Punch Count Graph */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Punches</h2>
                    <div className="h-48 bg-gray-200 flex justify-around items-center">
                        <AvgChart data={avgdata}></AvgChart>
                        <p className="text-gray-500">{avg}</p>
                    </div>
                </div>

                {/* Hand Height Graph */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Roll Yaw</h2>
                    <div className="h-48 bg-gray-200 flex justify-center items-center">
                        <RollChart
                            data={rolldata}
                            isRecording={isRecording}
                            setData={setRData}
                        ></RollChart>
                        <p className="text-gray-500">Bad Punches</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PunchingDashboard;
