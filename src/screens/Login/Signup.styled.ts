import styled from "styled-components";

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  direction: rtl;
`;

export const AuthCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 400px;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const AuthHeader = styled.div`
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  padding: 30px 20px;
  text-align: center;

  h1 {
    margin: 0 0 10px 0;
    font-size: 2rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    opacity: 0.9;
    font-size: 1rem;
  }
`;

export const AuthForm = styled.form`
  padding: 30px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #333;
    font-size: 0.95rem;
  }
`;

export const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid ${(props) => (props.error ? "#e74c3c" : "#e1e8ed")};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? "#e74c3c" : "#28a745")};
    box-shadow: 0 0 0 3px ${(props) =>
      props.error ? "rgba(231, 76, 60, 0.1)" : "rgba(40, 167, 69, 0.1)"};
  }

  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 5px;
  display: block;
`;

export const SubmitButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 14px;
  background: ${(props) =>
    props.disabled
      ? "#95a5a6"
      : "linear-gradient(135deg, #28a745 0%, #20c997 100%)"};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  margin-bottom: 20px;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const AuthActions = styled.div`
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #e1e8ed;

  a {
    color: #28a745;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;
