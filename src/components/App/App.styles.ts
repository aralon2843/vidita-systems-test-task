import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  margin-top: 50px;

  @media (max-width: 768px) {
    display: block;
    padding: 0px;
    margin-top: 20px;
  }
`;

export const ErrorMessage = styled.h1`
  font-size: 18px;
  font-weight: 500;
`;
