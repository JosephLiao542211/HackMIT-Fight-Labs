import React from 'react';

import PunchingDashboard from './PunchingDashboard';
import Arduino from './components/Arduino';

const App = () => {
    return (
        <div>
            <PunchingDashboard></PunchingDashboard>
            {/* <Arduino></Arduino> */}
        </div>
    );
};

export default App;
