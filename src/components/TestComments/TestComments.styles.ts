import styled from "styled-components";

export const CommentsContainer = styled.div`
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
`;

export const CommentItem = styled.div<{ level: number }>`
  margin-left: ${(props) => props.level * 30}px;
  margin-bottom: 15px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const AuthorInfo = styled.div`
  font-weight: bold;
  color: #333;
`;

export const CommentTime = styled.div`
  font-size: 12px;
  color: #666;
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

export const ReplyForm = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 10px;
  border: 1px solid #ddd;
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

export const CancelButton = styled.button`
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

export const MainCommentForm = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

export const TestLikeSection = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  text-align: center;
`;

export const LikeButton = styled.button<{ liked: boolean }>`
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

export const NoComments = styled.p`
  text-align: center;
  color: #666;
  padding: 20px;
`;
