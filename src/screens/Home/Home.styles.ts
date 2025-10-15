import { Link } from "react-router-dom";
import styled from "styled-components";

export const Page = styled.div`
  padding: 16px;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

export const Pill = styled.span`
  padding: 8px 12px;
  background-color: ${(p) =>
    `color-mix(in srgb, ${p.theme.colors.text} 3%, transparent)`};
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid ${(p) => p.theme.colors.outline};
`;

const BaseLink = styled(Link)`
  padding: 8px 16px;
  color: ${(p) => p.theme.colors.surface};
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
`;

export const SecondaryLink = styled(BaseLink)`
  background-color: ${(p) => p.theme.colors.secondary};
`;

export const InfoLink = styled(BaseLink)`
  background-color: ${(p) => p.theme.colors.primary};
`;

export const SuccessLink = styled(BaseLink)`
  background-color: ${(p) => p.theme.colors.success};
`;

export const PrimaryLink = styled(BaseLink)`
  background-color: ${(p) => p.theme.colors.primary};
`;

export const DangerButton = styled.button`
  padding: 8px 16px;
  background-color: ${(p) => p.theme.colors.danger};
  color: ${(p) => p.theme.colors.surface};
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
`;
