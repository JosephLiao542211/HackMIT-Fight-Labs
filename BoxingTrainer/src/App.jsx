import React from 'react';

const PunchingDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-3xl font-bold text-left mb-10">
                Punching Data Dashboard
            </h1>

            {/* First Row: Acceleration and Punch Counter */}
            <div className="grid grid-cols-5 gap-6 mb-6">
                {/* Acceleration Graph (4/5 of the row) */}
                <div className="col-span-4 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Acceleration</h2>
                    <div className="h-60 bg-gray-200 flex justify-center items-center">
                        {/* Graph will go here */}
                        <p className="text-gray-500">
                            Acceleration Graph Placeholder
                        </p>
                    </div>
                </div>

                {/* Punch Counter (1/5 of the row) */}
                <div className="col-span-1 bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center">
                    <h2 className="text-xl font-semibold mb-4">Punches</h2>
                    <div className="text-4xl font-bold text-gray-700">
                        {/* Punch counter number */}
                        120
                    </div>
                </div>
            </div>

            {/* Second Row: 50/50 split for Punches and Hand Height */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Punch Count Graph */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Punches</h2>
                    <div className="h-48 bg-gray-200 flex justify-center items-center">
                        {/* Graph will go here */}
                        <p className="text-gray-500">
                            Punches Graph Placeholder
                        </p>
                    </div>
                </div>

                {/* Hand Height Graph */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Hand Height</h2>
                    <div className="h-48 bg-gray-200 flex justify-center items-center">
                        {/* Graph will go here */}
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
