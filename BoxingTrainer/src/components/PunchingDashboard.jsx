import React, { useState } from 'react';

import LiveChart from './LiveCharts';

const PunchingDashboard = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [pCount, setpCount] = useState(0);
    const [data, setData] = useState([{ name: '0', velocity: 0 }]);

    // Initialize the timer hook

    // Handle start button click
    const handleStart = () => {
        setIsRecording(true);
    };

    // Handle stop button click
    const handleStop = () => {
        setIsRecording(false);
    };

    // Handle clear button click
    const handleClear = () => {
        setData([{ name: '0', velocity: 0 }]);
        setpCount(0);
        // Reset the timer to zero
        setIsRecording(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-3xl font-bold text-left mb-10">
                Punching Data Dashboard
            </h1>

            {/* Stopwatch Display */}

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
                            data={data}
                            punch={pCount}
                            punchfunction={setpCount}
                            setData={setData}
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
                    <div className="h-48 bg-gray-200 flex justify-center items-center">
                        <p className="text-gray-500">
                            Punches Graph Placeholder
                        </p>
                    </div>
                </div>

                {/* Hand Height Graph */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Hand Height</h2>
                    <div className="h-48 bg-gray-200 flex justify-center items-center">
                        <p className="text-gray-500">
                            Hand Height Graph Placeholder
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PunchingDashboard;
