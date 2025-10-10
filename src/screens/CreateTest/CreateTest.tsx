import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CreateTestContainer,
  Section,
  SectionHeader,
  SectionTitle,
  FormGroup,
  Label,
  Input,
  TextArea,
  ErrorMessage,
  Button as UIButton,
  TinyButton,
  QuestionCard,
  QuestionHeader,
  QuestionTitle,
  OptionRow,
  RadioInput,
  OptionInput,
  ActionButtons,
  AddQuestionButton,
  Required,
} from "./CreateTest.styles";
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
        ownerId: "current-user",
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

      await dispatch(createTest(newTest)).unwrap();
      alert("המבחן נשמר בהצלחה!");
      navigate("/");
    } catch (error) {
      console.error("שגיאה ביצירת המבחן:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <CreateTestContainer>
      <form onSubmit={handleSubmit}>
        <Section>
          <SectionTitle>{t("createTest.basicInfo")}</SectionTitle>

          <FormGroup>
            <Label>
              {t("createTest.title")} <Required>*</Required>
            </Label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateFormField("title", e.target.value)
              }
              placeholder={t("createTest.titlePlaceholder")}
              hasError={Boolean(errors.title)}
            />
            {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>
              {t("createTest.subject")} <Required>*</Required>
            </Label>
            <Input
              type="text"
              value={formData.subject}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateFormField("subject", e.target.value)
              }
              placeholder={t("createTest.subjectPlaceholder")}
              hasError={Boolean(errors.subject)}
            />
            {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>{t("createTest.description")}</Label>
            <TextArea
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                updateFormField("description", e.target.value)
              }
              placeholder={t("createTest.descriptionPlaceholder")}
              rows={3}
            />
          </FormGroup>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>{t("createTest.questions")}</SectionTitle>
            <AddQuestionButton type="button" onClick={addQuestion}>
              {t("createTest.addQuestion")}
            </AddQuestionButton>
          </SectionHeader>

          {formData.questions.map((question, questionIndex) => (
            <QuestionCard key={questionIndex}>
              <QuestionHeader>
                <QuestionTitle>
                  {t("createTest.questionNumber")} {questionIndex + 1}
                </QuestionTitle>
                {formData.questions.length > 1 && (
                  <TinyButton
                    type="button"
                    variant="danger"
                    onClick={() => removeQuestion(questionIndex)}
                  >
                    {t("createTest.remove")}
                  </TinyButton>
                )}
              </QuestionHeader>

              <FormGroup>
                <Label>
                  {t("createTest.questionText")} <Required>*</Required>
                </Label>
                <TextArea
                  value={question.question}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    updateQuestion(questionIndex, "question", e.target.value)
                  }
                  placeholder={t("createTest.questionPlaceholder")}
                  rows={2}
                  hasError={Boolean(errors[`question_${questionIndex}`])}
                />
                {errors[`question_${questionIndex}`] && (
                  <ErrorMessage>
                    {errors[`question_${questionIndex}`]}
                  </ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label>
                  {t("createTest.options")} <Required>*</Required>
                </Label>
                {question.options.map((option, optionIndex) => (
                  <OptionRow key={optionIndex}>
                    <RadioInput
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
                    />
                    <OptionInput
                      type="text"
                      value={option}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateQuestionOption(
                          questionIndex,
                          optionIndex,
                          e.target.value,
                        )
                      }
                      placeholder={`${t("createTest.optionPlaceholder")} ${
                        optionIndex + 1
                      }`}
                    />
                  </OptionRow>
                ))}
                {errors[`options_${questionIndex}`] && (
                  <ErrorMessage>
                    {errors[`options_${questionIndex}`]}
                  </ErrorMessage>
                )}
                {errors[`correct_${questionIndex}`] && (
                  <ErrorMessage>
                    {errors[`correct_${questionIndex}`]}
                  </ErrorMessage>
                )}
              </FormGroup>
            </QuestionCard>
          ))}
        </Section>

        <ActionButtons>
          <UIButton type="button" variant="secondary" onClick={handleCancel}>
            {t("createTest.cancel")}
          </UIButton>
          <UIButton type="submit" variant="primary">
            {t("createTest.create")}
          </UIButton>
        </ActionButtons>
      </form>
    </CreateTestContainer>
  );
};

export default CreateTest;
