import { loginUser } from 'app/services/Login/loginSignup';
import React, { useState } from 'react';
import { Button, CreateAccount, ForgotPassword, Input, LoginWrapper } from './styles';

interface LoginProps {
  // Props for the LoginForm component, if any
}

const Login: React.FC<LoginProps> = () => {
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
   loginUser(emailOrId,password);
  };

  return (
    <LoginWrapper>
      <Input
        type="text"
        placeholder="Email or ID"
        value={emailOrId}
        onChange={(e) => setEmailOrId(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Log in</Button>
      <ForgotPassword>
        <a href="/">Forgot password?</a>
      </ForgotPassword>
      <CreateAccount>
        Create new account
      </CreateAccount>
    </LoginWrapper>
  );
};

export default Login;
