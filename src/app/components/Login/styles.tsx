import styled from "styled-components";

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 8px;
  background-color: white;
`;

export const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  border: 1px solid #d9dbde;
  font-size: 16px;
  height: 40px;
  width: 20rem;
  max-width: 300px;

  &:focus {
    border: 1px solid #007aea;
    outline: none;
  }

  &::placeholder {
   
  }
`;

export const Button = styled.button`
  padding: 10px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #007aea;
  width: 100%;
  color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
`;

export const ForgotPassword = styled.a`
  color: #007aea;
    text-decoration: none;
    padding: 1rem 0px;
    width: 100%;
    text-align: center;
    font-size: 14px;
`;

export const CreateAccount = styled.button`
  color: #007aea;
  text-decoration: none;
  margin-top: 10px;
  font-size: 14px;
  padding: 10px;
  margin: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;