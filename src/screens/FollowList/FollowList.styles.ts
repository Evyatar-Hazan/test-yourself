import styled from "styled-components";

export const Page = styled.div`
  padding: ${(p) => p.theme.spacing.lg};
`;

export const Title = styled.h2`
  margin: 0 0 ${(p) => p.theme.spacing.md} 0;
`;

export const ErrorText = styled.p`
  color: ${(p) => p.theme.colors.danger};
`;

export const UsersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.sm};
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.sm};
  padding: ${(p) => p.theme.spacing.sm};
  border: 1px solid ${(p) => p.theme.colors.outline};
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => p.theme.colors.surface};
  cursor: pointer;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  flex: 1;
`;

export const UserName = styled.div`
  font-weight: ${(p) => p.theme.typography.fontWeight.medium};
`;

export const UserEmail = styled.div`
  font-size: ${(p) => p.theme.typography.fontSize.xs};
  color: ${(p) => p.theme.colors.secondary};
`;

export const Chevron = styled.div`
  color: ${(p) => p.theme.colors.secondary};
`;
