import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingPage = () => {
  return (
    <Container>
      <LoadingSpinner />
    </Container>
  );
};

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #333;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;

export default LoadingPage;
