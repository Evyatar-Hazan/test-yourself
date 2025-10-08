import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
    return <div>{t.t("exam.not_found")}</div>;
  }

  if (isSubmitted && result) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
        <h1>{test.subject}</h1>
        <h2>{t.t("exam.test_results")}</h2>
        <div
          style={{
            padding: 20,
            border: "2px solid #4CAF50",
            borderRadius: 8,
            backgroundColor: "#f8f9fa",
            marginBottom: 20,
          }}
        >
          <h3>
            {t.t("exam.your_score")}: {result.score}/100
          </h3>
          <p>
            {t.t("exam.answered_correctly")} {result.correctAnswers}{" "}
            {t.t("exam.out_of")} {result.totalQuestions} {t.t("exam.questions")}
          </p>
          <p>
            {t.t("exam.success_rate")}: {result.percentage}%
          </p>
        </div>

        <h3>{t.t("exam.review_answers")}:</h3>
        {test.questions.map((q, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: 24,
              padding: 16,
              border: "1px solid #ddd",
              borderRadius: 8,
              backgroundColor:
                userAnswers[idx] === q.correctIndex ? "#e8f5e8" : "#fff5f5",
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              {idx + 1}. {q.question}
            </div>
            <div style={{ marginTop: 8 }}>
              <p>
                <strong>{t.t("exam.correct_answer")}:</strong>{" "}
                {q.options[q.correctIndex]}
              </p>
              <p>
                <strong>{t.t("exam.your_answer")}:</strong>{" "}
                {userAnswers[idx] !== undefined
                  ? q.options[userAnswers[idx]]
                  : t.t("exam.not_answered")}
              </p>
              <div
                style={{
                  color: userAnswers[idx] === q.correctIndex ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {userAnswers[idx] === q.correctIndex
                  ? t.t("exam.correct")
                  : t.t("exam.wrong")}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1>{test.subject}</h1>
      <h2>{t.t("exam.questions_title")}</h2>
      {test.questions.map((q, idx) => (
        <div key={idx} style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: "bold" }}>
            {idx + 1}.<br />
            {q.question}
          </div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {q.options.map((opt, i) => (
              <li key={i}>
                <label>
                  <input
                    type="radio"
                    name={`q${idx}`}
                    value={i}
                    checked={userAnswers[idx] === i}
                    onChange={() => handleAnswerChange(idx, i)}
                  />{" "}
                  {opt}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div style={{ marginTop: 32, textAlign: "center" }}>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: canSubmit ? "#4CAF50" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: canSubmit ? "pointer" : "not-allowed",
          }}
        >
          {t.t("exam.submit")}
        </button>
        {!canSubmit && (
          <p style={{ color: "#666", marginTop: 8 }}>
            {t.t("exam.answer_all_questions")}
          </p>
        )}
      </div>
    </div>
  );
};

export default TestScreen;
