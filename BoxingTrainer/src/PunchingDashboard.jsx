import React, { useState, useEffect } from 'react';
import LiveChart from './components/LiveCharts';
import RollChart from './components/RollChart';
import Stopwatch from './components/Stopwatch';
import AvgChart from './components/AvgpChart';
import BoxingAdviceComponent from './components/AI';

const PunchingDashboard = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [pCount, setpCount] = useState(0);
    const [acceldata, setAData] = useState([{ name: '0', velocity: 0 }]);
    const [rolldata, setRData] = useState([{ name: '0', roll: 0 }]);
    const [avgdata, setAvgData] = useState([{ name: 0, value: 0 }]);
    const [avg, setAvg] = useState(0.0);
    const [pitch, setPitch] = useState(0);
    const [yaw, setYaw] = useState(0);

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

    useEffect(() => {
        setAvgData((prevData) => {
            const newDataPoint = { name: time, value: avg };
            const updatedData = [...prevData, newDataPoint];
            return updatedData.length > 10
                ? updatedData.slice(-10)
                : updatedData;
        });
    }, [avg, time]);

    useEffect(() => {
        const calculateAvg = () => {
            if (time > 0) {
                const minutes = Math.floor(time / 60);
                const sec = time % 60;
                const newAvg = (pCount / (minutes + sec / 60)).toFixed(2);
                setAvg(newAvg);
            } else {
                setAvg('N/A');
            }
        };

        const interval = setInterval(calculateAvg, 100);
        return () => clearInterval(interval);
    }, [pCount, time]);

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

            if (accelMatch && isRecording) {
                const accel = parseFloat(accelMatch[1]);
                setAData(prevData => {
                    const newData = [...prevData, { name: prevData.length.toString(), velocity: accel }];
                    return newData.slice(-1000); // Keep only the last 10 data points
                });
            }

            // For this example, we'll use the pitch as a stand-in for roll data
            
            if (pitchMatch && isRecording) {
                const roll = parseFloat(pitchMatch[1]);
                setRData(prevData => {
                    const newData = [...prevData, { name: prevData.length.toString(), roll: roll }];
                    return newData.slice(-1000); // Keep only the last 10 data points
                });
            }
        };

        return () => ws.close();
    }, [isRecording]);

    const handleStart = () => {
        setIsRunning(true);
        setIsRecording(true);
    };

    const handleStop = () => {
        setIsRunning(false);
        setIsRecording(false);
    };

    const handleClear = () => {
        setAData([{ name: '0', velocity: 0 }]);
        setRData([{ name: '0', roll: 0 }]);
        setAvgData([{ name: '0', value: 0 }]);
        setpCount(0);
        setIsRecording(false);
        setIsRunning(false);
        setTime(0);
    };

    return (
        <div className="min-h-screen bg-black text-cyan-400 p-10 font-mono">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-5xl font-bold text-cyan-300 tracking-wider">
                    FIGHT LAB
                </h1>
                <div className="text-right">
                    <p className="text-xs uppercase">
                        Advanced Combat Analytics
                    </p>
                    <p className="text-2xl font-semibold">v2.0.24</p>
                </div>
            </div>

            <Stopwatch
                time={time}
                isRunning={isRunning}
                onStart={handleStart}
                onStop={handleStop}
                onReset={handleClear}
            />

            <div className="mb-6 space-x-4">
                <button
                    onClick={handleStart}
                    className={`px-6 py-3 rounded-md text-black font-bold transition-all duration-300 ${
                        isRecording
                            ? 'bg-gray-800 cursor-not-allowed'
                            : 'bg-cyan-400 hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/50'
                    }`}
                    disabled={isRecording}
                >
                    INITIATE
                </button>
                <button
                    onClick={handleStop}
                    className="px-6 py-3 rounded-md bg-red-600 text-white font-bold hover:bg-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50"
                >
                    TERMINATE
                </button>
                <button
                    onClick={handleClear}
                    className="px-6 py-3 rounded-md bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50"
                >
                    RESET
                </button>
            </div>

            <div className="grid grid-cols-5 gap-6 mb-6">
                <div className="col-span-4 bg-gray-900 shadow-2xl rounded-md p-6 border-2 border-cyan-500">
                    <h2 className="text-2xl font-bold mb-4 text-cyan-300 uppercase">
                        Kinetic Force Analysis
                    </h2>
                    <div className="h-60 bg-black flex justify-center items-center rounded-md overflow-hidden border border-cyan-700">
                        <LiveChart
                            isRecording={isRecording}
                            data={acceldata}
                            punch={pCount}
                            punchfunction={setpCount}
                            setData={setAData}
                        />
                    </div>
                </div>

                <div className="col-span-1 bg-gray-900 shadow-2xl rounded-md p-6 flex flex-col justify-center items-center border-2 border-cyan-500">
                    <h2 className="text-2xl font-bold mb-4 text-cyan-300 uppercase">
                        Impact Tally
                    </h2>
                    <div className="text-7xl font-bold text-cyan-400 glow">
                        {pCount}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 shadow-2xl rounded-md p-6 border-2 border-cyan-500">
                    <h2 className="text-2xl font-bold mb-4 text-cyan-300 uppercase">
                        Combat Efficiency Metrics
                    </h2>
                    <div className="h-48 bg-black flex justify-around items-center rounded-md overflow-hidden border border-cyan-700">
                        <AvgChart data={avgdata} />
                        <p className="text-3xl font-bold text-cyan-400">
                            {avg} <span className="text-lg">hits/min</span>
                        </p>
                    </div>
                </div>

                <div className="bg-gray-900 shadow-2xl rounded-md p-6 border-2 border-cyan-500">
                    <h2 className="text-2xl font-bold mb-4 text-cyan-300 uppercase">
                        Rotational Dynamics
                    </h2>
                    <div className="h-48 bg-black flex justify-center items-center rounded-md overflow-hidden border border-cyan-700">
                        <RollChart
                            data={rolldata}
                            isRecording={isRecording}
                            setData={setRData}
                        />
                        <div className="ml-4">
                            <p className="text-xl font-bold text-red-500 uppercase">
                                Anomalous Vectors
                            </p>
                            <p className="text-lg text-cyan-400">
                                Pitch: {pitch.toFixed(2)}°
                            </p>
                            <p className="text-lg text-cyan-400">
                                Yaw: {yaw.toFixed(2)}°
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <BoxingAdviceComponent
                pcount={pCount}
                averagePunch={avg}
                velocityArray={acceldata}
                totalTime={time}
            />
        </div>
    );
};

export default PunchingDashboard;