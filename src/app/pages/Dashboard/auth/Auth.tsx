import React, { useState } from 'react';
import { AuthWrapper } from './styles';
import Brand from 'app/components/Brand';

import Signup from 'app/components/Signup';
import Login from 'app/pages/Login';

interface AuthProps {
}

const Auth: React.FC<AuthProps> = () => {
  const [showLogin, setShowLogin] = useState<boolean>(true);

  const handleShowSignup = () => {
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  return (
    <AuthWrapper className='auth-wrapper'>
        
        {showLogin ? (
        <Login onAccountCreation={handleShowSignup} />
      ) : (
        <Signup onExistingUserClick={handleShowLogin} />
      )}
    </AuthWrapper>
  );
};

export default Auth;
