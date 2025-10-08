import styled from "styled-components";
import { AppTheme } from "../../theme/types";

// Main container
export const TestContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  min-height: 100vh;

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.lg}px) {
    max-width: 900px;
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    max-width: 100%;
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
  }
`;

// Header section
export const TestHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl} 0;
  border-bottom: 2px solid
    ${({ theme }: { theme: AppTheme }) => theme.colors.primary};
  background: linear-gradient(
    135deg,
    ${({ theme }: { theme: AppTheme }) => `${theme.colors.primary}05`},
    ${({ theme }: { theme: AppTheme }) => `${theme.colors.secondary}05`}
  );
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.lg}
    ${({ theme }: { theme: AppTheme }) => theme.radius.lg} 0 0;

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg} 0;
    margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  }
`;

export const TestTitle = styled.h1`
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  font-size: 2.5rem;
  font-weight: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontWeight.bold};
  margin: 0 0 ${({ theme }: { theme: AppTheme }) => theme.spacing.md} 0;
  background: linear-gradient(
    135deg,
    ${({ theme }: { theme: AppTheme }) => theme.colors.primary},
    ${({ theme }: { theme: AppTheme }) => theme.colors.secondary}
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    font-size: 2rem;
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    font-size: 1.75rem;
  }
`;

export const TestSubtitle = styled.h2`
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.secondary};
  font-size: 1.5rem;
  font-weight: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontWeight.medium};
  margin: 0;

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    font-size: 1.25rem;
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    font-size: 1.125rem;
  }
`;

// Progress indicator
export const ProgressContainer = styled.div`
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${({ theme }: { theme: AppTheme }) => theme.colors.outline};
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.pill};
  overflow: hidden;
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    height: 10px;
  }
`;

export const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: linear-gradient(
    90deg,
    ${({ theme }: { theme: AppTheme }) => theme.colors.primary},
    ${({ theme }: { theme: AppTheme }) => theme.colors.success}
  );
  transition: width 0.3s ease;
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.pill};
`;

export const ProgressText = styled.p`
  text-align: center;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.secondary};
  font-size: 1rem;
  font-weight: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontWeight.medium};
  margin: 0;

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    font-size: 0.875rem;
  }
`;

// Questions section
export const QuestionCard = styled.div`
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.surface};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.colors.outline};
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.lg};
  padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.lg}px) {
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
    border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.md};
  }
`;

export const QuestionNumber = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.round};
  font-weight: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontWeight.bold};
  font-size: 1rem;
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    width: 36px;
    height: 36px;
    font-size: 0.875rem;
    margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }
`;

export const QuestionText = styled.div`
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  font-size: 1.25rem;
  font-weight: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontWeight.medium};
  line-height: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.lg}px) {
    font-size: 1.125rem;
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    font-size: 1rem;
    margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

// Options section
export const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    gap: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    gap: ${({ theme }: { theme: AppTheme }) => theme.spacing.sm};
  }
`;

export const OptionItem = styled.label<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  border: 2px solid
    ${({ theme, selected }: { theme: AppTheme; selected?: boolean }) =>
      selected ? theme.colors.primary : theme.colors.outline};
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.lg};
  background: ${({
    theme,
    selected,
  }: {
    theme: AppTheme;
    selected?: boolean;
  }) => (selected ? `${theme.colors.primary}15` : theme.colors.background)};
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 60px;

  &:hover {
    border-color: ${({ theme }: { theme: AppTheme }) => theme.colors.primary};
    background: ${({ theme }: { theme: AppTheme }) =>
      `${theme.colors.primary}10`};
    transform: translateX(4px);
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.lg}px) {
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
    min-height: 56px;
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
    min-height: 52px;
    border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.md};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.sm};
    min-height: 48px;

    &:hover {
      transform: none;
    }
  }
`;

export const RadioInput = styled.input`
  width: 24px;
  height: 24px;
  margin-right: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  accent-color: ${({ theme }: { theme: AppTheme }) => theme.colors.primary};
  cursor: pointer;

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    width: 20px;
    height: 20px;
    margin-right: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    width: 18px;
    height: 18px;
    margin-right: ${({ theme }: { theme: AppTheme }) => theme.spacing.sm};
  }
`;

export const OptionText = styled.span`
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  font-size: 1.1rem;
  line-height: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.lineHeight.normal};
  flex: 1;

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.lg}px) {
    font-size: 1rem;
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    font-size: 0.95rem;
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

// Submit section
export const SubmitSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl} 0;
  border-top: 1px solid
    ${({ theme }: { theme: AppTheme }) => theme.colors.outline};
  background: linear-gradient(
    135deg,
    ${({ theme }: { theme: AppTheme }) => `${theme.colors.primary}03`},
    ${({ theme }: { theme: AppTheme }) => `${theme.colors.secondary}03`}
  );
  border-radius: 0 0 ${({ theme }: { theme: AppTheme }) => theme.radius.lg}
    ${({ theme }: { theme: AppTheme }) => theme.radius.lg};

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    margin-top: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg} 0;
  }
`;

export const SubmitButton = styled.button<{ disabled?: boolean }>`
  background: ${({
    theme,
    disabled,
  }: {
    theme: AppTheme;
    disabled?: boolean;
  }) =>
    disabled
      ? theme.colors.outline
      : `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.success})`};
  color: white;
  border: none;
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.lg};
  padding: ${({ theme }: { theme: AppTheme }) =>
    `${theme.spacing.lg} ${theme.spacing.xl}`};
  font-size: 1.125rem;
  font-weight: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontWeight.bold};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  letter-spacing: 0.5px;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.lg}px) {
    min-width: 220px;
    font-size: 1rem;
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    min-width: 200px;
    padding: ${({ theme }: { theme: AppTheme }) =>
      `${theme.spacing.md} ${theme.spacing.lg}`};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    min-width: 180px;
    font-size: 0.95rem;
    padding: ${({ theme }: { theme: AppTheme }) =>
      `${theme.spacing.md} ${theme.spacing.md}`};
  }
`;

export const SubmitWarning = styled.p`
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.warning};
  font-size: 1rem;
  font-weight: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontWeight.medium};
  margin-top: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  text-align: center;
  max-width: 400px;

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    font-size: 0.9rem;
    margin-top: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    font-size: 0.85rem;
  }
`;

// Results section
export const ResultsContainer = styled.div`
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.surface};
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.lg};
  padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

export const ScoreCard = styled.div<{ score: number }>`
  background: ${({ theme, score }: { theme: AppTheme; score: number }) =>
    score >= 80
      ? `linear-gradient(135deg, ${theme.colors.success}20, ${theme.colors.success}10)`
      : score >= 60
        ? `linear-gradient(135deg, ${theme.colors.warning}20, ${theme.colors.warning}10)`
        : `linear-gradient(135deg, ${theme.colors.danger}20, ${theme.colors.danger}10)`};
  border: 3px solid
    ${({ theme, score }: { theme: AppTheme; score: number }) =>
      score >= 80
        ? theme.colors.success
        : score >= 60
          ? theme.colors.warning
          : theme.colors.danger};
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.lg};
  padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  text-align: center;
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
    border-width: 2px;
  }
`;

export const ScoreDisplay = styled.h3`
  font-size: 3rem;
  font-weight: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontWeight.bold};
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  margin: 0 0 ${({ theme }: { theme: AppTheme }) => theme.spacing.lg} 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.lg}px) {
    font-size: 2.5rem;
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    font-size: 2rem;
    margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    font-size: 1.75rem;
  }
`;

export const ScoreDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  margin-top: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
  }
`;

export const ScoreItem = styled.div`
  text-align: center;
  padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};

  .label {
    font-size: 1rem;
    color: ${({ theme }: { theme: AppTheme }) => theme.colors.secondary};
    margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.xs};
    font-weight: ${({ theme }: { theme: AppTheme }) =>
      theme.typography.fontWeight.medium};
  }

  .value {
    font-size: 1.5rem;
    font-weight: ${({ theme }: { theme: AppTheme }) =>
      theme.typography.fontWeight.bold};
    color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.sm};

    .label {
      font-size: 0.9rem;
    }

    .value {
      font-size: 1.25rem;
    }
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    .label {
      font-size: 0.8rem;
    }

    .value {
      font-size: 1.125rem;
    }
  }
`;

// Review section
export const ReviewTitle = styled.h3`
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  font-size: 1.75rem;
  font-weight: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  text-align: center;
  background: linear-gradient(
    135deg,
    ${({ theme }: { theme: AppTheme }) => theme.colors.primary},
    ${({ theme }: { theme: AppTheme }) => theme.colors.secondary}
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    font-size: 1.5rem;
    margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    font-size: 1.25rem;
  }
`;

export const ReviewCard = styled.div<{ isCorrect: boolean }>`
  background: ${({
    theme,
    isCorrect,
  }: {
    theme: AppTheme;
    isCorrect: boolean;
  }) => (isCorrect ? `${theme.colors.success}15` : `${theme.colors.danger}15`)};
  border: 2px solid
    ${({ theme, isCorrect }: { theme: AppTheme; isCorrect: boolean }) =>
      isCorrect ? theme.colors.success : theme.colors.danger};
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.lg};
  padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
    border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.md};
  }
`;

export const ReviewQuestionText = styled.div`
  font-weight: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontWeight.bold};
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  font-size: 1.125rem;
  line-height: 1.6;

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    font-size: 1rem;
    margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

export const AnswerRow = styled.div`
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
  background: ${({ theme }: { theme: AppTheme }) =>
    `${theme.colors.background}80`};
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.md};
  font-size: 1rem;

  strong {
    color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
    font-weight: ${({ theme }: { theme: AppTheme }) =>
      theme.typography.fontWeight.bold};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.sm};
    font-size: 0.95rem;
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    font-size: 0.9rem;
  }
`;

export const ResultBadge = styled.div<{ isCorrect: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }: { theme: AppTheme }) =>
    `${theme.spacing.md} ${theme.spacing.lg}`};
  background: ${({
    theme,
    isCorrect,
  }: {
    theme: AppTheme;
    isCorrect: boolean;
  }) => (isCorrect ? theme.colors.success : theme.colors.danger)};
  color: white;
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.pill};
  font-weight: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontWeight.bold};
  font-size: 1rem;
  margin-top: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    font-size: 0.9rem;
    padding: ${({ theme }: { theme: AppTheme }) =>
      `${theme.spacing.sm} ${theme.spacing.md}`};
    margin-top: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.sm}px) {
    font-size: 0.8rem;
    padding: ${({ theme }: { theme: AppTheme }) =>
      `${theme.spacing.xs} ${theme.spacing.sm}`};
  }
`;
