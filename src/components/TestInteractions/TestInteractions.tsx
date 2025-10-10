import React, { useState, useEffect } from "react";
import {
  InteractionsContainer,
  ActionsGroup,
  ActionButton,
  CommentsList,
  CommentItem,
  CommentAuthor,
  CommentBody,
  CommentTime,
  CommentInput,
  InputActions,
  SubmitButton,
  CancelButton,
  LinkButton,
  ComposeWrapper,
} from "./TestInteractions.styles";
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
          <ComposeWrapper>
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
          </ComposeWrapper>

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
                <LinkButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToTest();
                  }}
                >
                  {t("interactions.see_more_comments", {
                    count: comments.length - 3,
                  })}
                </LinkButton>
              )}
            </div>
          )}
        </CommentsList>
      )}
    </>
  );
};

export default TestInteractions;
