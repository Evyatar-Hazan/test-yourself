import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  TestContainer,
  TestHeader,
  TestTitle,
  TestSubtitle,
  ProgressContainer,
  ProgressBar,
  ProgressFill,
  ProgressText,
  QuestionCard,
  QuestionNumber,
  QuestionText,
  OptionsList,
  OptionItem,
  RadioInput,
  OptionText,
  SubmitSection,
  SubmitButton,
  SubmitWarning,
  ScoreCard,
  ScoreDisplay,
  ScoreDetails,
  ScoreItem,
  ReviewTitle,
  ReviewCard,
  ReviewQuestionText,
  AnswerRow,
  ResultBadge,
} from "./TestScreen.styles";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";
import tests from "../../mocks/tests.json";
import { updateTestStatistics } from "../../utils/testStatistics";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

interface TestType {
  id: string;
  subject: string;
  questions: Question[];
}

interface TestResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
}

const TestScreen: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const t = useTranslationTyped();
  const test: TestType | undefined = Array.isArray(tests)
    ? (tests as TestType[]).find((t) => t.id === testId)
    : undefined;

  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  const handleAnswerChange = (
    questionIndex: number,
    selectedOption: number,
  ) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const calculateResult = (): TestResult => {
    let correctAnswers = 0;
    const totalQuestions = test!.questions.length;

    test!.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctIndex) {
        correctAnswers++;
      }
    });

    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const score = Math.round(percentage); // ציון מ-0 עד 100

    return {
      score,
      correctAnswers,
      totalQuestions,
      percentage,
    };
  };

  const handleSubmit = () => {
    const testResult = calculateResult();
    setResult(testResult);
    setIsSubmitted(true);

    // עדכון הסטטיסטיקות של המבחן
    if (test?.id) {
      const updatedStats = updateTestStatistics(test.id, testResult);
      console.log("Updated test statistics:", updatedStats);
    }

    console.log("Test result:", testResult);
  };

  const canSubmit = Object.keys(userAnswers).length === test?.questions.length;

  if (!test) {
    return (
      <TestContainer>
        <TestHeader>
          <TestTitle>{t.t("exam.not_found")}</TestTitle>
        </TestHeader>
      </TestContainer>
    );
  }

  if (isSubmitted && result) {
    return (
      <TestContainer>
        <TestHeader>
          <TestTitle>{test.subject}</TestTitle>
          <TestSubtitle>{t.t("exam.test_results")}</TestSubtitle>
        </TestHeader>

        <ScoreCard score={result.score}>
          <ScoreDisplay>
            {t.t("exam.your_score")}: {result.score}/100
          </ScoreDisplay>
          <ScoreDetails>
            <ScoreItem>
              <div className="label">{t.t("exam.answered_correctly")}</div>
              <div className="value">
                {result.correctAnswers}/{result.totalQuestions}
              </div>
            </ScoreItem>
            <ScoreItem>
              <div className="label">{t.t("exam.success_rate")}</div>
              <div className="value">{result.percentage}%</div>
            </ScoreItem>
          </ScoreDetails>
        </ScoreCard>

        <ReviewTitle>{t.t("exam.review_answers")}:</ReviewTitle>
        {test.questions.map((q, idx) => (
          <ReviewCard key={idx} isCorrect={userAnswers[idx] === q.correctIndex}>
            <ReviewQuestionText>
              {idx + 1}. {q.question}
            </ReviewQuestionText>
            <AnswerRow>
              <strong>{t.t("exam.correct_answer")}:</strong>{" "}
              {q.options[q.correctIndex]}
            </AnswerRow>
            <AnswerRow>
              <strong>{t.t("exam.your_answer")}:</strong>{" "}
              {userAnswers[idx] !== undefined
                ? q.options[userAnswers[idx]]
                : t.t("exam.not_answered")}
            </AnswerRow>
            <ResultBadge isCorrect={userAnswers[idx] === q.correctIndex}>
              {userAnswers[idx] === q.correctIndex
                ? t.t("exam.correct")
                : t.t("exam.wrong")}
            </ResultBadge>
          </ReviewCard>
        ))}
      </TestContainer>
    );
  }

  return (
    <TestContainer>
      <TestHeader>
        <TestTitle>{test.subject}</TestTitle>
        <TestSubtitle>{t.t("exam.questions_title")}</TestSubtitle>
      </TestHeader>

      <ProgressContainer>
        <ProgressBar>
          <ProgressFill
            progress={
              (Object.keys(userAnswers).length / test.questions.length) * 100
            }
          />
        </ProgressBar>
        <ProgressText>
          {Object.keys(userAnswers).length} / {test.questions.length}{" "}
          {t.t("exam.questions")}
        </ProgressText>
      </ProgressContainer>

      {test.questions.map((q, idx) => (
        <QuestionCard key={idx}>
          <QuestionNumber>{idx + 1}</QuestionNumber>
          <QuestionText>{q.question}</QuestionText>
          <OptionsList>
            {q.options.map((opt, i) => (
              <OptionItem key={i} selected={userAnswers[idx] === i}>
                <RadioInput
                  type="radio"
                  name={`q${idx}`}
                  value={i}
                  checked={userAnswers[idx] === i}
                  onChange={() => handleAnswerChange(idx, i)}
                />
                <OptionText>{opt}</OptionText>
              </OptionItem>
            ))}
          </OptionsList>
        </QuestionCard>
      ))}

      <SubmitSection>
        <SubmitButton onClick={handleSubmit} disabled={!canSubmit}>
          {t.t("exam.submit")}
        </SubmitButton>
        {!canSubmit && (
          <SubmitWarning>{t.t("exam.answer_all_questions")}</SubmitWarning>
        )}
      </SubmitSection>
    </TestContainer>
  );
};

export default TestScreen;
