import React from 'react';

const PunchingDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-3xl font-bold text-center mb-10">
                Punching Data Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Acceleration Graph */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Acceleration</h2>
                    <div className="h-48 bg-gray-200 flex justify-center items-center">
                        {/* Graph will go here */}
                        <p className="text-gray-500">Graph Placeholder</p>
                    </div>
                </div>

                {/* Punch Count Graph */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Punches</h2>
                    <div className="h-48 bg-gray-200 flex justify-center items-center">
                        {/* Graph will go here */}
                        <p className="text-gray-500">Graph Placeholder</p>
                    </div>
                </div>

                {/* Hand Height Graph */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Hand Height</h2>
                    <div className="h-48 bg-gray-200 flex justify-center items-center">
                        {/* Graph will go here */}
                        <p className="text-gray-500">Graph Placeholder</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PunchingDashboard;
