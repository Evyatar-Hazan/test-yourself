import styled from "styled-components";

export const InteractionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
  font-size: 14px;
  color: #666;
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
  color: ${(props) => (props.active ? "#e91e63" : "#666")};
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const CommentsList = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
  max-height: 200px;
  overflow-y: auto;
`;

export const CommentItem = styled.div`
  padding: 8px;
  background: #f9f9f9;
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
  color: #666;
  font-size: 10px;
`;

export const CommentInput = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 8px;
  border: 1px solid #ddd;
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
  background: ${(props) => (props.disabled ? "#ccc" : "#0066cc")};
  color: white;
  border: none;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 12px;
`;

export const CancelButton = styled.button`
  background: transparent;
  color: #666;
  border: 1px solid #ddd;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
`;

export const LinkButton = styled(ActionButton)`
  color: #0066cc;
  text-decoration: underline;
  padding: 4px 0;
`;

export const ComposeWrapper = styled.div`
  margin-bottom: 8px;
`;
