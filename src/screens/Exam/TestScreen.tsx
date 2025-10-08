import React from "react";
import { useParams } from "react-router-dom";
import tests from "../../mocks/tests.json";

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

const TestScreen: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const test: TestType | undefined = Array.isArray(tests)
    ? (tests as TestType[]).find((t) => t.id === testId)
    : undefined;

  // i18n (פשוט):
  const notFoundText = "Test not found";
  const questionsTitle = "Questions";

  if (!test) {
    return <div>{notFoundText}</div>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1>{test.subject}</h1>
      <h2>{questionsTitle}</h2>
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
                  <input type="radio" name={`q${idx}`} value={i} /> {opt}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {/* אפשר להוסיף כפתור שליחה/בדיקה בהמשך */}
    </div>
  );
};

export default TestScreen;
