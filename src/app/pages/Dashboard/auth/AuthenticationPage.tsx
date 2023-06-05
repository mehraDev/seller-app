import React, { useState } from 'react';

import Signup from 'app/components/Signup';
import Login from 'app/pages/Login';
import { AuthWrapper } from './styles';

interface AuthProps {
}

const AuthenticationPage: React.FC<AuthProps> = () => {
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

export default AuthenticationPage;
