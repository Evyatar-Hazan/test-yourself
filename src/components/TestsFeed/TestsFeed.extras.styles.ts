import styled from "styled-components";

export const ClickableCard = styled.div`
  cursor: pointer;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const AvatarImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
  background: #eee;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const Username = styled.span`
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #007bff;
  }
`;
