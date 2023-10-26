import React, { useState } from 'react';
import { loginUser } from 'app/services/Authentication/login';
import Button from 'ui/Button';
import styled, { useTheme } from "styled-components";
import {   Row,Text } from 'ui/basic';
import Form, { InputPassword, InputText } from 'ui/Form';
import Icon, { IconName } from 'ui/Icon';

interface LoginProps {
}

const Login: React.FC<LoginProps> = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true); 
  
    try {
      await loginUser(email, password);
    } catch (error: any) {
      setLoginError('Invalid email or password.');
    } finally {
      setIsLoggingIn(false);
    }
  };
   const isEmailValid = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  const handleBlurEmail = () => {
    const sanitizedEmail = email.replace(/[^a-zA-Z0-9@._-]/g, '');
    if (email !== sanitizedEmail || (email.length > 0 && !isEmailValid(email))) {
      setEmail(sanitizedEmail);
      setEmailErrorMessage('Please enter a valid email address.');
    }
  };
  const handleChangeEmail = (v: string) => {
    setEmail(v);
    setEmailErrorMessage('');
    setLoginError('');
  };
   const handleBlurPassword = () => {
    if ( password && password.length < 8) {
      setPasswordErrorMessage('Invalid Password.');
    }
  };
  const handleChangePassword = (v: string) => {
    setPassword(v);
    setLoginError('');
    setPasswordErrorMessage('');
  };

  const isValidForm = (
    email.trim() !== '' &&
    password.trim() !== '' &&
    !emailErrorMessage &&
    !passwordErrorMessage 
  )

  return (
    <LoginWrapper >
      <Row  a='center' p={'0 0 2rem'}>
        <Text  s='18' w={7} type='heading'>Sign in to your account</Text>
      </Row>
      <Form onSubmit={handleLogin} style={{gap:'2rem'}}>
              <InputText
                placeholder="Email"
                value={email}
                required={true}
                error={emailErrorMessage}
                onBlur={handleBlurEmail}
                onChange={handleChangeEmail}
              />
            <InputPassword value={password} 
              onChange={handleChangePassword}
              onBlur={handleBlurPassword}
              error={passwordErrorMessage}
              placeholder='Password'
            />

             <Row style={{position:'relative'}}>
              {loginError && 
                <Row a="center" style={{position:'absolute'}}>
                  <Icon name={IconName.Alert} color={theme.errorColor.errorText} height={0.8} width={0.8} isHoverable={false}/>
                  <Text s="12" w={5} c={theme.errorColor.errorText}>{loginError}</Text>
                </Row>
              }
            </Row>
            <Button loading={isLoggingIn} width='100%' padding='1rem' type='submit' disabled={!isValidForm}>
              <Text s='18' w={5} mb='2px' mt='2px'>{isLoggingIn ? `Logging in...` :  `Log in` }</Text>
              </Button>
        </Form>
      <Row>
      </Row>
    </LoginWrapper>
  );
};

export default Login;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1.5rem;
  border-radius: 8px;
  max-width: 32rem; 
  width: 100%;
  background-color: white;
  border: 1px solid rgb(234, 234, 234);
`;


export const ErrorWrapper = styled.div`
  align-self: flex-start;
  margin-left: 0.5rem;
`;
