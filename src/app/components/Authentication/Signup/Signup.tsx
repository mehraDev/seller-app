import React, { useState } from 'react';
import { Form, SignupFormWrapper } from './styles';
import { Row, Text } from 'ui/basic';
import { InputPassword, InputTelephone, InputText } from 'ui/Form';
import Button from 'ui/Button';
import { IFormSignUp } from 'app/services/Authentication';
import { EShop } from 'app/enums';
import { LoadingAnimation } from 'ui/LoadingAnimation';

interface Props {
  onSignUp: (data: IFormSignUp) => void;
}

const SignupForm: React.FC<Props> = ({ onSignUp }) => {
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
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData: IFormSignUp = {
      shopName,
      email,
      password,
      phone,
      shopType: EShop.Food
    };
    try {
      onSignUp(formData);
    } catch (error: any) {
      console.log('Error during signup: ', error);
      setFormError(error?.message)
    } finally{
      setIsLoading(false);
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
      <Form onSubmit={handleSignUp}>
        <InputText
          p='0 0 1rem'
          error={shopNameErrorMessage}
          placeholder="Business Name"
          value={shopName}
          required={true}
          onChange={handleChangeBusinessName}
          onBlur={handleBlurBusinessName}
          tt='cap'
        />
        <InputText
          p='0 0 1rem'
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
        <Row p='1rem'>
        <Button margin='1.5rem 0' width='100%' padding='1rem' type='submit' disabled={!isValidForm}>
              {
              isLoading  ?  <LoadingAnimation/> :
              <Text s='18' w={5} mb='2px' mt='2px'>Continue</Text>
              }
              </Button>
        </Row>
      </Form>
    </SignupFormWrapper>
  );
};

export default SignupForm;
