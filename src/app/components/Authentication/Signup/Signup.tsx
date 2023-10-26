import React, { useState } from 'react';
import { Form, SignupFormWrapper } from './styles';
import { Row, Text } from 'ui/basic';
import { InputPassword, InputTelephone, InputText } from 'ui/Form';
import Button from 'ui/Button';
import { IFormSignUp } from 'app/services/Authentication';
import { EShop } from 'app/enums';
import Icon, { IconName } from 'ui/Icon';
import { useTheme } from 'styled-components';

interface Props {
  onSignUp: (data: IFormSignUp) => Promise<boolean>
}

const SignupForm: React.FC<Props> = ({ onSignUp }) => {
  const theme = useTheme()
  const [shopName, setShopName] = useState('');
  const [shopNameErrorMessage, setShopNameErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signupError, setSignupError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData: IFormSignUp = {
      shopName,
      email,
      password,
      phone,
      shopType: EShop.Food
    };
    try{
      setIsSigningUp(true);
      await onSignUp(formData);
    }catch(error) {
      setSignupError('Oops! Something went wrong. ');
      throw error;
    }
    finally{
      setIsSigningUp(false);
    }
  };

  const handleBlurBusinessName = () => {
    const sanitizedValue = shopName.replace(/[^a-zA-Z0-9\s]+/g, '');
    if (shopName !== sanitizedValue) {
      setShopNameErrorMessage('Use only letters, numbers, and spaces.');
    }
  };

  const handleChangeBusinessName = (v:string) => {
    setShopName(v);
    setShopNameErrorMessage('');
  }
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
  };
  const handleBlurPhone = () => {
    const sanitizedPhone = phone.replace(/[^0-9]/g, '');
    if (phone !== sanitizedPhone || (sanitizedPhone.length !== 10 && sanitizedPhone)) {
      setPhone(sanitizedPhone);
      setPhoneErrorMessage('Please enter a valid phone number.');
    }
  };
  const handleChangePhone = (v: string) => {
    setPhone(v);
    setPhoneErrorMessage('');
  };
  const handleBlurPassword = () => {
    if ( password && password.length < 8) {
      setPasswordErrorMessage('Password must be at least 8 characters long.');
    }
  };
  const handleChangePassword = (v: string) => {
    setPassword(v);
    setPasswordErrorMessage('');
    setConfirmPassword('');
    setConfirmPasswordErrorMessage('')
  };
  const handleClickPassword = () => {
    setPasswordErrorMessage('')
  }
  const handleBlurConfirmPassword = () => {
    if ( confirmPassword && confirmPassword !== password) {
      setConfirmPasswordErrorMessage('Passwords do not match.');
    }
  };
  const handleChangeConfirmPassword = (v: string) => {
    setConfirmPassword(v);
    setConfirmPasswordErrorMessage('');
  };
  
  const isValidForm = (
    shopName.trim() !== '' &&
    email.trim() !== '' &&
    phone.trim() !== '' &&
    password.trim() !== '' &&
    confirmPassword.trim() !== '' &&
    !shopNameErrorMessage &&
    !emailErrorMessage &&
    !phoneErrorMessage &&
    !passwordErrorMessage &&
    !confirmPasswordErrorMessage
  )
  return (
    <SignupFormWrapper>
      <Row a='center' p={'0 0 2rem'}>
        <Text s='18' w={7} type='heading'>Create your account</Text>
      </Row>
      <Form onSubmit={handleSignUp} style={{gap:'2rem'}}>
        <InputText
          error={shopNameErrorMessage}
          placeholder="Business Name"
          value={shopName}
          required={true}
          onChange={handleChangeBusinessName}
          onBlur={handleBlurBusinessName}
          tt='cap'
        />
        <InputText
          placeholder="Email"
          value={email}
          required={true}
          error={emailErrorMessage}
          onBlur={handleBlurEmail}
          onChange={handleChangeEmail}
        />
        <InputTelephone
          placeholder="Phone"
          required={true}
          value={phone}
          error={phoneErrorMessage}
          onChange={handleChangePhone}
          onBlur={handleBlurPhone}
        />
        <InputPassword
          value={password} 
          onChange={handleChangePassword}
          onBlur={handleBlurPassword}
          error={passwordErrorMessage}
          placeholder='Password'
          type="new"
          onClick={handleClickPassword}
        />
        <InputPassword value={confirmPassword} 
          onChange={handleChangeConfirmPassword}
          onBlur={handleBlurConfirmPassword}
          error={confirmPasswordErrorMessage}
          placeholder='Confirm Password'
          onClick={() => setConfirmPasswordErrorMessage('')}
        />
        <Row style={{position:'relative'}}>
              {signupError && 
                <Row a="center" style={{position:'absolute'}}>
                  <Icon name={IconName.Alert} color={theme.errorColor.errorText} height={0.8} width={0.8} isHoverable={false}/>
                  <Text s="12" w={5} c={theme.errorColor.errorText}>{signupError}</Text>
                </Row>
              }
            </Row>
        <Button loading={isSigningUp} width='100%' padding='1rem' type='submit' disabled={!isValidForm || isSigningUp}>
              <Text s='18' w={5} mb='2px' mt='2px'>{isSigningUp ? `Signing up...` :  `Continue` }</Text>
        </Button>
      </Form>
    </SignupFormWrapper>
  );
};

export default SignupForm;
