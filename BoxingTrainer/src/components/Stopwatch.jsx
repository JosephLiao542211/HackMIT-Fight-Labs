// Stopwatch.js
import React from 'react';

const Stopwatch = ({ time, isRunning, onStart, onStop, onReset }) => {
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
            2,
            '0'
        )}`;
    };

    return (
        <div className="flex flex-col items-center p-4 rounded-lg shadow-md w-64">
            <div className="text-4xl font-semibold mb-4">
                {formatTime(time)}
            </div>
        </div>
    );
};

export default Stopwatch;
