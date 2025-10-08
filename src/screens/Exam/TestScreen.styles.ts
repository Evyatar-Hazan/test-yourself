import styled from "styled-components";
import { AppTheme } from "../../theme/types";

// Main container
export const TestContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  min-height: 100vh;

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  }
`;

// Header section
export const TestHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  border-bottom: 2px solid
    ${({ theme }: { theme: AppTheme }) => theme.colors.primary};
`;

export const TestTitle = styled.h1`
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  font-size: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontSize.xl};
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
`;

export const TestSubtitle = styled.h2`
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.secondary};
  font-size: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontSize.lg};
  font-weight: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontWeight.medium};
  margin: 0;
`;

// Progress indicator
export const ProgressContainer = styled.div`
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }: { theme: AppTheme }) => theme.colors.outline};
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.pill};
  overflow: hidden;
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
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
`;

export const ProgressText = styled.p`
  text-align: center;
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.secondary};
  font-size: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontSize.sm};
  margin: 0;
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

  &:hover {
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }: { theme: AppTheme }) =>
      theme.breakpoints.md}px) {
    padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  }
`;

export const QuestionNumber = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.round};
  font-weight: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontWeight.bold};
  font-size: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
`;

export const QuestionText = styled.div`
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  font-size: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontSize.md};
  font-weight: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontWeight.medium};
  line-height: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
`;

// Options section
export const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
`;

export const OptionItem = styled.label<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  border: 2px solid
    ${({ theme, selected }: { theme: AppTheme; selected?: boolean }) =>
      selected ? theme.colors.primary : theme.colors.outline};
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.md};
  background: ${({
    theme,
    selected,
  }: {
    theme: AppTheme;
    selected?: boolean;
  }) => (selected ? `${theme.colors.primary}15` : theme.colors.background)};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }: { theme: AppTheme }) => theme.colors.primary};
    background: ${({ theme }: { theme: AppTheme }) =>
      `${theme.colors.primary}10`};
  }
`;

export const RadioInput = styled.input`
  width: 20px;
  height: 20px;
  margin-right: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
  accent-color: ${({ theme }: { theme: AppTheme }) => theme.colors.primary};
`;

export const OptionText = styled.span`
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  font-size: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontSize.md};
  line-height: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.lineHeight.normal};
`;

// Submit section
export const SubmitSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  padding-top: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  border-top: 1px solid
    ${({ theme }: { theme: AppTheme }) => theme.colors.outline};
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
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.md};
  padding: ${({ theme }: { theme: AppTheme }) =>
    `${theme.spacing.lg} ${theme.spacing.xl}`};
  font-size: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontSize.md};
  font-weight: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontWeight.medium};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  min-width: 200px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const SubmitWarning = styled.p`
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.warning};
  font-size: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontSize.sm};
  margin-top: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
  text-align: center;
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
  border: 2px solid
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
`;

export const ScoreDisplay = styled.h3`
  font-size: 2rem;
  font-weight: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontWeight.bold};
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  margin: 0 0 ${({ theme }: { theme: AppTheme }) => theme.spacing.md} 0;
`;

export const ScoreDetails = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  margin-top: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
`;

export const ScoreItem = styled.div`
  text-align: center;

  .label {
    font-size: ${({ theme }: { theme: AppTheme }) =>
      theme.typography.fontSize.sm};
    color: ${({ theme }: { theme: AppTheme }) => theme.colors.secondary};
    margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.xs};
  }

  .value {
    font-size: ${({ theme }: { theme: AppTheme }) =>
      theme.typography.fontSize.lg};
    font-weight: ${({ theme }: { theme: AppTheme }) =>
      theme.typography.fontWeight.bold};
    color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  }
`;

// Review section
export const ReviewTitle = styled.h3`
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  font-size: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontSize.lg};
  font-weight: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.xl};
  text-align: center;
`;

export const ReviewCard = styled.div<{ isCorrect: boolean }>`
  background: ${({
    theme,
    isCorrect,
  }: {
    theme: AppTheme;
    isCorrect: boolean;
  }) => (isCorrect ? `${theme.colors.success}10` : `${theme.colors.danger}10`)};
  border: 1px solid
    ${({ theme, isCorrect }: { theme: AppTheme; isCorrect: boolean }) =>
      isCorrect ? theme.colors.success : theme.colors.danger};
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radius.lg};
  padding: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
`;

export const ReviewQuestionText = styled.div`
  font-weight: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontWeight.bold};
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.lg};
`;

export const AnswerRow = styled.div`
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};

  strong {
    color: ${({ theme }: { theme: AppTheme }) => theme.colors.text};
  }
`;

export const ResultBadge = styled.div<{ isCorrect: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }: { theme: AppTheme }) =>
    `${theme.spacing.xs} ${theme.spacing.md}`};
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
  font-size: ${({ theme }: { theme: AppTheme }) =>
    theme.typography.fontSize.sm};
  margin-top: ${({ theme }: { theme: AppTheme }) => theme.spacing.md};
`;
