import styled from "styled-components";

export const CommentsContainer = styled.div`
  padding: 20px;
  background: ${(p) => p.theme.colors.surface};
  border-radius: 8px;
  margin-top: 20px;
`;

export const CommentItem = styled.div<{ level: number }>`
  margin-left: ${(props) => props.level * 30}px;
  margin-bottom: 15px;
  padding: 15px;
  background: ${(p) => p.theme.colors.surface};
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.colors.outline};
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const AuthorInfo = styled.div`
  font-weight: bold;
  color: ${(p) => p.theme.colors.text};
`;

export const CommentTime = styled.div`
  font-size: 12px;
  color: ${(p) =>
    `color-mix(in srgb, ${p.theme.colors.text} 60%, transparent)`};
`;

export const CommentBody = styled.div`
  margin: 10px 0;
  line-height: 1.5;
`;

export const CommentActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const ActionButton = styled.button<{ active?: boolean }>`
  background: ${(props) =>
    props.active ? props.theme.colors.primary : "transparent"};
  color: ${(props) =>
    props.active ? props.theme.colors.surface : props.theme.colors.primary};
  border: 1px solid ${(p) => p.theme.colors.primary};
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background: ${(props) =>
      props.active
        ? `color-mix(in srgb, ${props.theme.colors.primary} 80%, transparent)`
        : `color-mix(in srgb, ${props.theme.colors.primary} 10%, transparent)`};
  }
`;

export const ReplyForm = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: ${(p) =>
    `color-mix(in srgb, ${p.theme.colors.text} 5%, transparent)`};
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 10px;
  border: 1px solid ${(p) => p.theme.colors.outline};
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
`;

export const FormActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const SubmitButton = styled.button`
  background: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.surface};
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${(p) =>
      `color-mix(in srgb, ${p.theme.colors.primary} 85%, black)`};
  }

  &:disabled {
    background: ${(p) =>
      `color-mix(in srgb, ${p.theme.colors.text} 30%, transparent)`};
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  background: transparent;
  color: ${(p) =>
    `color-mix(in srgb, ${p.theme.colors.text} 60%, transparent)`};
  border: 1px solid ${(p) => p.theme.colors.outline};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${(p) =>
      `color-mix(in srgb, ${p.theme.colors.text} 5%, transparent)`};
  }
`;

export const MainCommentForm = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: ${(p) => p.theme.colors.surface};
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.colors.outline};
`;

export const TestLikeSection = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: ${(p) => p.theme.colors.surface};
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.colors.outline};
  text-align: center;
`;

export const LikeButton = styled.button<{ liked: boolean }>`
  background: ${(props) =>
    props.liked ? props.theme.colors.danger : "transparent"};
  color: ${(props) =>
    props.liked ? props.theme.colors.surface : props.theme.colors.danger};
  border: 2px solid ${(p) => p.theme.colors.danger};
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;

  &:hover {
    background: ${(props) =>
      props.liked
        ? `color-mix(in srgb, ${props.theme.colors.danger} 85%, black)`
        : `color-mix(in srgb, ${props.theme.colors.danger} 10%, transparent)`};
  }
`;

export const NoComments = styled.p`
  text-align: center;
  color: ${(p) =>
    `color-mix(in srgb, ${p.theme.colors.text} 60%, transparent)`};
  padding: 20px;
`;
