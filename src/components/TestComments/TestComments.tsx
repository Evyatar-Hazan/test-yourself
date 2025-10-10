import React, { useState } from "react";
import {
  CommentsContainer,
  CommentItem,
  CommentHeader,
  AuthorInfo,
  CommentTime,
  CommentBody,
  CommentActions,
  ActionButton,
  ReplyForm,
  TextArea,
  FormActions,
  SubmitButton,
  CancelButton,
  MainCommentForm,
  TestLikeSection,
  LikeButton,
  NoComments,
} from "./TestComments.styles";
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
          <NoComments>{t("comments.no_comments")}</NoComments>
        ) : (
          comments.map((comment) => renderComment(comment))
        )}
      </div>
    </CommentsContainer>
  );
};

export default TestComments;
