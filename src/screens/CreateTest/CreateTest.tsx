import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTest } from "../../features/tests/testsSlice";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";
import type { AppDispatch } from "../../store";
import type { Question, Test } from "../../types/test";

interface CreateTestFormData {
  title: string;
  subject: string;
  description?: string;
  questions: Question[];
}

const CreateTest: React.FC = () => {
  const { t } = useTranslationTyped();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<CreateTestFormData>({
    title: "",
    subject: "",
    description: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctIndex: 0,
      },
    ],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const updateFormField = (field: keyof CreateTestFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const updateQuestion = (
    index: number,
    field: keyof Question,
    value: string | number | string[],
  ) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === index ? { ...q, [field]: value } : q,
      ),
    }));
  };

  const updateQuestionOption = (
    questionIndex: number,
    optionIndex: number,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              options: q.options.map((opt, oi) =>
                oi === optionIndex ? value : opt,
              ),
            }
          : q,
      ),
    }));
  };

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: "",
          options: ["", "", "", ""],
          correctIndex: 0,
        },
      ],
    }));
  };

  const removeQuestion = (index: number) => {
    if (formData.questions.length > 1) {
      setFormData((prev) => ({
        ...prev,
        questions: prev.questions.filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = t("createTest.errors.titleRequired");
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t("createTest.errors.subjectRequired");
    }

    formData.questions.forEach((question, index) => {
      if (!question.question.trim()) {
        newErrors[`question_${index}`] = t(
          "createTest.errors.questionRequired",
        );
      }

      const filledOptions = question.options.filter((opt) => opt.trim());
      if (filledOptions.length < 2) {
        newErrors[`options_${index}`] = t("createTest.errors.minTwoOptions");
      }

      if (!question.options[question.correctIndex]?.trim()) {
        newErrors[`correct_${index}`] = t(
          "createTest.errors.correctAnswerRequired",
        );
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const newTest: Omit<Test, "id"> = {
        ownerId: "current-user", // TODO: Replace with actual user ID from auth
        subject: formData.subject,
        score: 0,
        takenAt: new Date().toISOString(),
        questionsCount: formData.questions.length,
        respondentsCount: 0,
        averageScore: 0,
        averageCorrect: 0,
        questions: formData.questions.filter(
          (q) =>
            q.question.trim() &&
            q.options.filter((opt) => opt.trim()).length >= 2,
        ),
      };

      // שמירת המבחן באמצעות Redux
      await dispatch(createTest(newTest)).unwrap();

      alert("המבחן נשמר בהצלחה!");
      console.log("המבחן נשמר בהצלחה!");

      // ניווט חזרה לדף הבית
      navigate("/");
    } catch (error) {
      console.error("שגיאה ביצירת המבחן:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div style={{ padding: "16px", maxWidth: "800px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>
        {/* Test Basic Info */}
        <div style={{ marginBottom: "24px" }}>
          <h2>{t("createTest.basicInfo")}</h2>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              {t("createTest.title")}{" "}
              <span style={{ color: "#e74c3c" }}>*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateFormField("title", e.target.value)
              }
              placeholder={t("createTest.titlePlaceholder")}
              style={{
                width: "100%",
                padding: "12px",
                border: errors.title ? "2px solid #e74c3c" : "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            />
            {errors.title && (
              <span style={{ color: "#e74c3c", fontSize: "14px" }}>
                {errors.title}
              </span>
            )}
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              {t("createTest.subject")}{" "}
              <span style={{ color: "#e74c3c" }}>*</span>
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateFormField("subject", e.target.value)
              }
              placeholder={t("createTest.subjectPlaceholder")}
              style={{
                width: "100%",
                padding: "12px",
                border: errors.subject ? "2px solid #e74c3c" : "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            />
            {errors.subject && (
              <span style={{ color: "#e74c3c", fontSize: "14px" }}>
                {errors.subject}
              </span>
            )}
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              {t("createTest.description")}
            </label>
            <textarea
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                updateFormField("description", e.target.value)
              }
              placeholder={t("createTest.descriptionPlaceholder")}
              rows={3}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "16px",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            />
          </div>
        </div>

        {/* Questions */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h2>{t("createTest.questions")}</h2>
            <button
              type="button"
              onClick={addQuestion}
              style={{
                padding: "8px 16px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {t("createTest.addQuestion")}
            </button>
          </div>

          {formData.questions.map((question, questionIndex) => (
            <div
              key={questionIndex}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                }}
              >
                <h3 style={{ margin: 0, fontSize: "18px" }}>
                  {t("createTest.questionNumber")} {questionIndex + 1}
                </h3>
                {formData.questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(questionIndex)}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    {t("createTest.remove")}
                  </button>
                )}
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold",
                  }}
                >
                  {t("createTest.questionText")}{" "}
                  <span style={{ color: "#e74c3c" }}>*</span>
                </label>
                <textarea
                  value={question.question}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    updateQuestion(questionIndex, "question", e.target.value)
                  }
                  placeholder={t("createTest.questionPlaceholder")}
                  rows={2}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: errors[`question_${questionIndex}`]
                      ? "2px solid #e74c3c"
                      : "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "16px",
                    boxSizing: "border-box",
                    resize: "vertical",
                  }}
                />
                {errors[`question_${questionIndex}`] && (
                  <span style={{ color: "#e74c3c", fontSize: "14px" }}>
                    {errors[`question_${questionIndex}`]}
                  </span>
                )}
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold",
                  }}
                >
                  {t("createTest.options")}{" "}
                  <span style={{ color: "#e74c3c" }}>*</span>
                </label>
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                      gap: "8px",
                    }}
                  >
                    <input
                      type="radio"
                      name={`correct_${questionIndex}`}
                      checked={question.correctIndex === optionIndex}
                      onChange={() =>
                        updateQuestion(
                          questionIndex,
                          "correctIndex",
                          optionIndex,
                        )
                      }
                      style={{ cursor: "pointer" }}
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateQuestionOption(
                          questionIndex,
                          optionIndex,
                          e.target.value,
                        )
                      }
                      placeholder={`${t("createTest.optionPlaceholder")} ${optionIndex + 1}`}
                      style={{
                        flex: 1,
                        padding: "8px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                ))}
                {errors[`options_${questionIndex}`] && (
                  <span style={{ color: "#e74c3c", fontSize: "14px" }}>
                    {errors[`options_${questionIndex}`]}
                  </span>
                )}
                {errors[`correct_${questionIndex}`] && (
                  <span style={{ color: "#e74c3c", fontSize: "14px" }}>
                    {errors[`correct_${questionIndex}`]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div
          style={{ display: "flex", gap: "16px", justifyContent: "flex-end" }}
        >
          <button
            type="button"
            onClick={handleCancel}
            style={{
              padding: "12px 24px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {t("createTest.cancel")}
          </button>
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {t("createTest.create")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTest;
