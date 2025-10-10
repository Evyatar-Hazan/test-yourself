import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";
import {
  toggleTestLike,
  fetchTestComments,
  addTestComment,
} from "../../services/api";
import type { TestComment } from "../../types/test";

interface TestInteractionsProps {
  testId: string;
  testLikes?: string[];
  currentUserId: string;
  onNavigateToTest: () => void;
  onNavigateToExam: () => void;
}

const InteractionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
  font-size: 14px;
  color: #666;
`;

const ActionsGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const ActionButton = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#e91e63" : "#666")};
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const CommentsList = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
  max-height: 200px;
  overflow-y: auto;
`;

const CommentItem = styled.div`
  padding: 8px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 4px;
  font-size: 12px;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 2px;
`;

const CommentBody = styled.div`
  margin-bottom: 2px;
`;

const CommentTime = styled.div`
  color: #666;
  font-size: 10px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
  margin-bottom: 4px;
`;

const InputActions = styled.div`
  display: flex;
  gap: 8px;
`;

const SubmitButton = styled.button<{ disabled?: boolean }>`
  background: ${(props) => (props.disabled ? "#ccc" : "#0066cc")};
  color: white;
  border: none;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 12px;
`;

const CancelButton = styled.button`
  background: transparent;
  color: #666;
  border: 1px solid #ddd;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
`;

const TestInteractions: React.FC<TestInteractionsProps> = ({
  testId,
  testLikes = [],
  currentUserId,
  onNavigateToTest,
  onNavigateToExam,
}) => {
  const { t } = useTranslationTyped();
  const [likes, setLikes] = useState<string[]>(testLikes);
  const [comments, setComments] = useState<TestComment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);

  const isLiked = likes.includes(currentUserId);

  useEffect(() => {
    setLikes(testLikes);
  }, [testLikes]);

  useEffect(() => {
    if (showComments && comments.length === 0) {
      loadComments();
    }
  }, [showComments]);

  const loadComments = async () => {
    try {
      setLoadingComments(true);
      const fetchedComments = await fetchTestComments(testId);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const success = await toggleTestLike(testId, currentUserId);
      if (success) {
        setLikes((prev) =>
          prev.includes(currentUserId)
            ? prev.filter((id) => id !== currentUserId)
            : [...prev, currentUserId],
        );
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleToggleComments = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowComments(!showComments);
    setNewComment("");
  };

  const handleAddComment = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!newComment.trim()) return;

    try {
      const comment = await addTestComment(
        testId,
        currentUserId,
        newComment.trim(),
      );
      if (comment) {
        setComments((prev) => [comment, ...prev]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNewComment("");
    setShowComments(false);
  };

  return (
    <>
      <InteractionsContainer>
        <ActionsGroup>
          <ActionButton active={isLiked} onClick={handleToggleLike}>
            <span>{isLiked ? "❤️" : "🤍"}</span>
            <span>{likes.length}</span>
          </ActionButton>

          <ActionButton onClick={handleToggleComments}>
            <span>💬</span>
            <span>{comments.length}</span>
          </ActionButton>

          <ActionButton
            onClick={(e) => {
              e.stopPropagation();
              onNavigateToExam();
            }}
          >
            <span>📝</span>
            <span>{t("interactions.take_test")}</span>
          </ActionButton>
        </ActionsGroup>
      </InteractionsContainer>

      {showComments && (
        <CommentsList>
          <div style={{ marginBottom: "8px" }}>
            <CommentInput
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={t("interactions.comment_placeholder")}
              onClick={(e) => e.stopPropagation()}
            />
            <InputActions>
              <SubmitButton
                disabled={!newComment.trim()}
                onClick={handleAddComment}
              >
                {t("interactions.send")}
              </SubmitButton>
              <CancelButton onClick={handleCancel}>
                {t("interactions.cancel")}
              </CancelButton>
            </InputActions>
          </div>

          {loadingComments ? (
            <div>{t("interactions.loading_comments")}</div>
          ) : (
            <div>
              {comments.slice(0, 3).map((comment) => (
                <CommentItem key={comment.id}>
                  <CommentAuthor>
                    {t("comments.user_label", { id: comment.authorId })}
                  </CommentAuthor>
                  <CommentBody>{comment.body}</CommentBody>
                  <CommentTime>
                    {new Date(comment.createdAt).toLocaleString("he-IL")}
                  </CommentTime>
                </CommentItem>
              ))}
              {comments.length > 3 && (
                <ActionButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToTest();
                  }}
                  style={{
                    color: "#0066cc",
                    textDecoration: "underline",
                    padding: "4px 0",
                  }}
                >
                  {t("interactions.see_more_comments", {
                    count: comments.length - 3,
                  })}
                </ActionButton>
              )}
            </div>
          )}
        </CommentsList>
      )}
    </>
  );
};

export default TestInteractions;
