import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TestComments from "../../components/TestComments/TestComments";
import { useTestComments } from "../../hooks/useTestComments";
import { toggleTestLike } from "../../services/api";
import { getTestById } from "../../utils/helpers";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const BackButton = styled.button`
  background: transparent;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const TestCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const TestHeader = styled.div`
  margin-bottom: 20px;
`;

const TestTitle = styled.h1`
  color: #333;
  margin-bottom: 8px;
`;

const TestMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: #666;
  font-size: 14px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin: 20px 0;
`;

const StatCard = styled.div`
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #0066cc;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

const ActionButton = styled.button`
  background: #0066cc;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
  
  &:hover {
    background: #004499;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const TestDetailPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
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
    refreshComments,
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
        <LoadingSpinner>טוען מבחן...</LoadingSpinner>
      </Container>
    );
  }

  if (!test) {
    return (
      <Container>
        <ErrorMessage>מבחן לא נמצא</ErrorMessage>
        <BackButton onClick={() => navigate("/")}>
          חזרה לדף הבית
        </BackButton>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton onClick={() => navigate("/")}>
        ← חזרה לדף הבית
      </BackButton>

      <TestCard>
        <TestHeader>
          <TestTitle>{test.subject}</TestTitle>
          <TestMeta>
            <MetaItem>
              📅 {new Date(test.takenAt).toLocaleDateString("he-IL")}
            </MetaItem>
            <MetaItem>
              ⏱️ {test.questionsCount} שאלות
            </MetaItem>
            <MetaItem>
              👥 {test.respondentsCount} נבחנים
            </MetaItem>
          </TestMeta>
        </TestHeader>

        <StatsGrid>
          <StatCard>
            <StatValue>{test.averageScore.toFixed(1)}</StatValue>
            <StatLabel>ציון ממוצע</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{test.averageCorrect.toFixed(1)}</StatValue>
            <StatLabel>תשובות נכונות ממוצע</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{testLikes.length}</StatValue>
            <StatLabel>לייקים</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{comments.length}</StatValue>
            <StatLabel>תגובות</StatLabel>
          </StatCard>
        </StatsGrid>

        <div>
          <ActionButton onClick={startTest}>
            התחל מבחן
          </ActionButton>
        </div>
      </TestCard>

      {commentsError && (
        <ErrorMessage>{commentsError}</ErrorMessage>
      )}

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