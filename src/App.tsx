import React, { useState } from 'react';
import Dashboard from 'components/Dashboard/Dashboard';
function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [userType, setUserType] = useState('');
  const [shopKind, setShopKind] = useState('');

  
  return (
    <div id='app'>
      {loggedIn && (
        // <Dashboard userType={userType} shopKind={shopKind} />
        <Dashboard/>
      )}
    </div>
  );
}

export default App;
