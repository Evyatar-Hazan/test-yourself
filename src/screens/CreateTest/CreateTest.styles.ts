import styled from "styled-components";

export const CreateTestContainer = styled.div`
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

export const Section = styled.div`
  margin-bottom: 24px;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  font-weight: 600;
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
`;

export const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px;
  border: ${({ hasError, theme }) =>
    hasError
      ? `2px solid ${theme.colors.danger}`
      : `1px solid ${theme.colors.outline}`};
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const TextArea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px;
  border: ${({ hasError, theme }) =>
    hasError
      ? `2px solid ${theme.colors.danger}`
      : `1px solid ${theme.colors.outline}`};
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 14px;
  display: block;
  margin-top: 4px;
`;

export const Button = styled.button<{
  variant?: "primary" | "secondary" | "success" | "danger" | "warning";
}>`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;

  background-color: ${({ variant, theme }) => {
    switch (variant) {
      case "success":
        return theme.colors.success;
      case "danger":
        return theme.colors.danger;
      case "warning":
        return theme.colors.warning;
      case "secondary":
        return theme.colors.secondary;
      default:
        return theme.colors.primary;
    }
  }};

  color: ${({ variant }) => (variant === "warning" ? "#000000" : "#ffffff")};
  /* Use theme tokens for text color */
  color: ${({ variant, theme }) =>
    variant === "warning" ? theme.colors.text : theme.colors.surface};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SmallButton = styled(Button)`
  padding: 8px 16px;
  font-size: 14px;
`;

export const TinyButton = styled(Button)`
  padding: 4px 8px;
  font-size: 12px;
`;

export const QuestionCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.outline};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 2px 4px
    ${({ theme }) =>
      `color-mix(in srgb, ${theme.colors.text} 10%, transparent)`};
`;

export const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

export const QuestionTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
`;

export const OptionRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
`;

export const RadioInput = styled.input`
  margin: 0;
  cursor: pointer;
`;

export const OptionInput = styled(Input)`
  flex: 1;
  margin: 0;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.outline};
`;

export const AddQuestionButton = styled(Button).attrs({
  variant: "success",
})`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Required = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  margin-left: 4px;
`;
