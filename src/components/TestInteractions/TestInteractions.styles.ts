import styled from "styled-components";

export const InteractionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${(p) => p.theme.colors.outline};
  font-size: 14px;
  color: ${(p) =>
    `color-mix(in srgb, ${p.theme.colors.text} 60%, transparent)`};
`;

export const ActionsGroup = styled.div`
  display: flex;
  gap: 16px;
`;

export const ActionButton = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: ${(props) =>
    props.active
      ? props.theme.colors.danger
      : `color-mix(in srgb, ${props.theme.colors.text} 60%, transparent)`};
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: ${(p) =>
      `color-mix(in srgb, ${p.theme.colors.text} 5%, transparent)`};
  }
`;

export const CommentsList = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${(p) => p.theme.colors.outline};
  max-height: 200px;
  overflow-y: auto;
`;

export const CommentItem = styled.div`
  padding: 8px;
  background: ${(p) =>
    `color-mix(in srgb, ${p.theme.colors.text} 5%, transparent)`};
  border-radius: 4px;
  margin-bottom: 4px;
  font-size: 12px;
`;

export const CommentAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 2px;
`;

export const CommentBody = styled.div`
  margin-bottom: 2px;
`;

export const CommentTime = styled.div`
  color: ${(p) =>
    `color-mix(in srgb, ${p.theme.colors.text} 60%, transparent)`};
  font-size: 10px;
`;

export const CommentInput = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 8px;
  border: 1px solid ${(p) => p.theme.colors.outline};
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
  margin-bottom: 4px;
`;

export const InputActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const SubmitButton = styled.button<{ disabled?: boolean }>`
  background: ${(props) =>
    props.disabled
      ? `color-mix(in srgb, ${props.theme.colors.text} 30%, transparent)`
      : props.theme.colors.primary};
  color: ${(p) => p.theme.colors.surface};
  border: none;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 12px;
`;

export const CancelButton = styled.button`
  background: transparent;
  color: ${(p) =>
    `color-mix(in srgb, ${p.theme.colors.text} 60%, transparent)`};
  border: 1px solid ${(p) => p.theme.colors.outline};
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
`;

export const LinkButton = styled(ActionButton)`
  color: ${(p) => p.theme.colors.primary};
  text-decoration: underline;
  padding: 4px 0;
`;

export const ComposeWrapper = styled.div`
  margin-bottom: 8px;
`;
