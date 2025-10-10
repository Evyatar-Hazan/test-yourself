import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  BackButton,
  TestCard,
  TestHeader,
  TestTitle,
  TestMeta,
  MetaItem,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  ActionButton,
  LoadingSpinner,
  ErrorMessage,
} from "./TestDetailPage.styles";
import TestComments from "../../components/TestComments/TestComments";
import { useTestComments } from "../../hooks/useTestComments";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";
import { toggleTestLike } from "../../services/api";
import { getTestById } from "../../utils/helpers";

const TestDetailPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslationTyped();
  const [test, setTest] = useState<any>(null); // eslint-disable-line
  const [testLoading, setTestLoading] = useState(true);
  const [testLikes, setTestLikes] = useState<string[]>([]);

  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    handleAddComment,
    handleUpdateComment,
    handleDeleteComment,
    handleToggleCommentLike,
    // refreshComments,
  } = useTestComments(testId || "");

  // For demo - hardcoded current user ID
  const currentUserId = "u1";

  useEffect(() => {
    const loadTest = async () => {
      if (!testId) return;

      try {
        setTestLoading(true);
        const testData = await getTestById(testId);
        setTest(testData);
        setTestLikes(testData?.likes || []);
      } catch (error) {
        console.error("Error loading test:", error);
      } finally {
        setTestLoading(false);
      }
    };

    loadTest();
  }, [testId]);

  const handleToggleTestLike = async (testIdParam: string, userId: string) => {
    try {
      const success = await toggleTestLike(testIdParam, userId);
      if (success) {
        // Update local state
        setTestLikes((prev) => {
          const isLiked = prev.includes(userId);
          if (isLiked) {
            return prev.filter((id) => id !== userId);
          } else {
            return [...prev, userId];
          }
        });
      }
    } catch (error) {
      console.error("Error toggling test like:", error);
    }
  };

  const startTest = () => {
    navigate(`/exam/${testId}`);
  };

  if (testLoading) {
    return (
      <Container>
        <LoadingSpinner>{t("testDetail.loading")}</LoadingSpinner>
      </Container>
    );
  }

  if (!test) {
    return (
      <Container>
        <ErrorMessage>{t("testDetail.not_found")}</ErrorMessage>
        <BackButton onClick={() => navigate("/")}>
          {t("testDetail.back_to_home")}
        </BackButton>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton onClick={() => navigate("/")}>
        {t("testDetail.back_to_home")}
      </BackButton>

      <TestCard>
        <TestHeader>
          <TestTitle>{test.subject}</TestTitle>
          <TestMeta>
            <MetaItem>
              <span>{t("icons.calendar")}</span>
              <span>{new Date(test.takenAt).toLocaleDateString("he-IL")}</span>
            </MetaItem>
            <MetaItem>
              <span>{t("icons.stopwatch")}</span>
              <span>{test.questionsCount}</span>
              <span>{t("tests.questions")}</span>
            </MetaItem>
            <MetaItem>
              <span>{t("icons.users")}</span>
              <span>{test.respondentsCount}</span>
              <span>{t("testDetail.respondents")}</span>
            </MetaItem>
          </TestMeta>
        </TestHeader>

        <StatsGrid>
          <StatCard>
            <StatValue>{test.averageScore.toFixed(1)}</StatValue>
            <StatLabel>{t("tests.average_score")}</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{test.averageCorrect.toFixed(1)}</StatValue>
            <StatLabel>{t("general.average_correct")}</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{testLikes.length}</StatValue>
            <StatLabel>{t("general.likes")}</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{comments.length}</StatValue>
            <StatLabel>{t("general.comments")}</StatLabel>
          </StatCard>
        </StatsGrid>

        <div>
          <ActionButton onClick={startTest}>
            {t("testDetail.start_test")}
          </ActionButton>
        </div>
      </TestCard>

      {commentsError && <ErrorMessage>{commentsError}</ErrorMessage>}

      {!commentsLoading && (
        <TestComments
          testId={testId || ""}
          comments={comments}
          currentUserId={currentUserId}
          onAddComment={handleAddComment}
          onUpdateComment={handleUpdateComment}
          onDeleteComment={handleDeleteComment}
          onToggleLike={handleToggleCommentLike}
          onToggleTestLike={handleToggleTestLike}
          testLikes={testLikes}
        />
      )}
    </Container>
  );
};

export default TestDetailPage;
