import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import { IFormSignUp, signupAndCreateUserProfile } from 'app/services/Authentication'; 
import { Box, Col, Row, Text } from 'ui/basic';
import { useTheme } from 'styled-components';
import { ButtonUnderlined } from 'ui/Button';

interface IAuthentication {
  isNewUserAccountCreationInProgress: (flag:boolean) => void;
}

const Authentication: React.FC<IAuthentication> = ({ isNewUserAccountCreationInProgress }) => {
  const theme = useTheme();
  const [isExistingUser, setIsExistingUser] = useState<boolean>(true);

  const handleShowSignup = () => {
    setIsExistingUser(false);
  };

  const handleShowLogin = () => {
    setIsExistingUser(true);
  };

  const handleSignup = async (data: IFormSignUp) => {
    try {
      isNewUserAccountCreationInProgress(true);
      await signupAndCreateUserProfile(data);
      isNewUserAccountCreationInProgress(false)
      return true;
    } catch (error: any) {
      throw error
    } finally{
    }
  };

  return (
    <Box className='auth' p='4rem 2rem' j='center'>
      <Col p='2rem 0'  style={{maxWidth: '480px'}}>
        <Row p={'0 0 2rem'}>
          <Text s='24' w={6} type='heading'>digibhoomi</Text>
        </Row>
          {isExistingUser ? (
          <Login/>
        ) : (
          <Signup onSignUp={handleSignup}/>
        )}
        <Row j='center' p={'1rem'} a='center'>
            <Text s='14' >{isExistingUser ? `Don't have an account ?` : `Already have an account ?`}</Text>
            <ButtonUnderlined border='none' variant='secondary' padding='0' onClick={isExistingUser ? handleShowSignup : handleShowLogin}> 
              <Text s='14' ml='8px' w={5} c={theme.brandColor.primaryText}>{isExistingUser ?
               'Register'
              :'Sign In'
               }</Text>
            </ButtonUnderlined>
        </Row>
      </Col>
    </Box>
  );
};

export default Authentication;
