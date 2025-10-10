import React, { useState } from "react";
import styled from "styled-components";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";
import { TestComment } from "../../types/test";

interface TestCommentsProps {
  testId: string;
  comments: TestComment[];
  currentUserId: string;
  onAddComment: (testId: string, body: string, parentId?: string) => void;
  onUpdateComment: (testId: string, commentId: string, body: string) => void;
  onDeleteComment: (testId: string, commentId: string) => void;
  onToggleLike: (testId: string, commentId: string, userId: string) => void;
  onToggleTestLike: (testId: string, userId: string) => void;
  testLikes: string[];
}

const CommentsContainer = styled.div`
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
`;

const CommentItem = styled.div<{ level: number }>`
  margin-left: ${(props) => props.level * 30}px;
  margin-bottom: 15px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const AuthorInfo = styled.div`
  font-weight: bold;
  color: #333;
`;

const CommentTime = styled.div`
  font-size: 12px;
  color: #666;
`;

const CommentBody = styled.div`
  margin: 10px 0;
  line-height: 1.5;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ActionButton = styled.button<{ active?: boolean }>`
  background: ${(props) => (props.active ? "#0066cc" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#0066cc")};
  border: 1px solid #0066cc;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background: ${(props) => (props.active ? "#004499" : "#f0f8ff")};
  }
`;

const ReplyForm = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
`;

const FormActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  background: #0066cc;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #004499;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background: transparent;
  color: #666;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const MainCommentForm = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const TestLikeSection = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  text-align: center;
`;

const LikeButton = styled.button<{ liked: boolean }>`
  background: ${(props) => (props.liked ? "#ff6b6b" : "transparent")};
  color: ${(props) => (props.liked ? "white" : "#ff6b6b")};
  border: 2px solid #ff6b6b;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;

  &:hover {
    background: ${(props) => (props.liked ? "#ff5252" : "#fff5f5")};
  }
`;

const TestComments: React.FC<TestCommentsProps> = ({
  testId,
  comments,
  currentUserId,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
  onToggleLike,
  onToggleTestLike,
  testLikes,
}) => {
  const { t } = useTranslationTyped();
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleSubmitMainComment = () => {
    if (newComment.trim()) {
      onAddComment(testId, newComment.trim());
      setNewComment("");
    }
  };

  const handleSubmitReply = (parentId: string) => {
    if (replyText.trim()) {
      onAddComment(testId, replyText.trim(), parentId);
      setReplyText("");
      setReplyingTo(null);
    }
  };

  const handleEditComment = (commentId: string) => {
    if (editText.trim()) {
      onUpdateComment(testId, commentId, editText.trim());
      setEditingComment(null);
      setEditText("");
    }
  };

  const startEdit = (comment: TestComment) => {
    setEditingComment(comment.id);
    setEditText(comment.body);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("he-IL");
  };

  const renderComment = (
    comment: TestComment,
    level: number = 0,
  ): React.ReactElement => {
    const isLikedByUser = comment.likes.includes(currentUserId);
    const isOwnComment = comment.authorId === currentUserId;

    return (
      <div key={comment.id}>
        <CommentItem level={level}>
          <CommentHeader>
            <AuthorInfo>
              {t("comments.user_label", { id: comment.authorId })}
            </AuthorInfo>
            <CommentTime>
              {formatDate(comment.createdAt)}
              {comment.updatedAt && t("comments.updated_suffix")}
            </CommentTime>
          </CommentHeader>

          {editingComment === comment.id ? (
            <div>
              <TextArea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder={t("comments.edit_placeholder")}
              />
              <FormActions>
                <SubmitButton onClick={() => handleEditComment(comment.id)}>
                  {t("comments.save")}
                </SubmitButton>
                <CancelButton onClick={() => setEditingComment(null)}>
                  {t("comments.cancel")}
                </CancelButton>
              </FormActions>
            </div>
          ) : (
            <>
              <CommentBody>{comment.body}</CommentBody>
              <CommentActions>
                <ActionButton
                  active={isLikedByUser}
                  onClick={() =>
                    onToggleLike(testId, comment.id, currentUserId)
                  }
                >
                  ♥ {comment.likes.length}
                </ActionButton>
                <ActionButton onClick={() => setReplyingTo(comment.id)}>
                  {t("comments.reply")}
                </ActionButton>
                {isOwnComment && (
                  <>
                    <ActionButton onClick={() => startEdit(comment)}>
                      {t("comments.edit")}
                    </ActionButton>
                    <ActionButton
                      onClick={() => onDeleteComment(testId, comment.id)}
                    >
                      {t("comments.delete")}
                    </ActionButton>
                  </>
                )}
              </CommentActions>
            </>
          )}

          {replyingTo === comment.id && (
            <ReplyForm>
              <TextArea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={t("comments.main_placeholder")}
              />
              <FormActions>
                <SubmitButton
                  onClick={() => handleSubmitReply(comment.id)}
                  disabled={!replyText.trim()}
                >
                  {t("interactions.send")}
                </SubmitButton>
                <CancelButton onClick={() => setReplyingTo(null)}>
                  {t("interactions.cancel")}
                </CancelButton>
              </FormActions>
            </ReplyForm>
          )}
        </CommentItem>

        {comment.replies.map((reply) => renderComment(reply, level + 1))}
      </div>
    );
  };

  const isTestLiked = testLikes.includes(currentUserId);

  return (
    <CommentsContainer>
      <TestLikeSection>
        <LikeButton
          liked={isTestLiked}
          onClick={() => onToggleTestLike(testId, currentUserId)}
        >
          ♥ {isTestLiked ? "אהבת" : "אהוב"} ({testLikes.length})
        </LikeButton>
      </TestLikeSection>

      <MainCommentForm>
        <h3>{t("comments.write_comment")}</h3>
        <TextArea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={t("comments.main_placeholder")}
        />
        <FormActions>
          <SubmitButton
            onClick={handleSubmitMainComment}
            disabled={!newComment.trim()}
          >
            {t("comments.submit_comment")}
          </SubmitButton>
        </FormActions>
      </MainCommentForm>

      <div>
        <h3>
          {t("comments.title")} ({comments.length})
        </h3>
        {comments.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666", padding: "20px" }}>
            {t("comments.no_comments")}
          </p>
        ) : (
          comments.map((comment) => renderComment(comment))
        )}
      </div>
    </CommentsContainer>
  );
};

export default TestComments;
