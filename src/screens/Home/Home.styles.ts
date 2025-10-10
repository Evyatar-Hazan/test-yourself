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
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid #dee2e6;
`;

const BaseLink = styled(Link)`
  padding: 8px 16px;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
`;

export const SecondaryLink = styled(BaseLink)`
  background-color: #6c757d;
`;

export const InfoLink = styled(BaseLink)`
  background-color: #17a2b8;
`;

export const SuccessLink = styled(BaseLink)`
  background-color: #28a745;
`;

export const PrimaryLink = styled(BaseLink)`
  background-color: #007bff;
`;

export const DangerButton = styled.button`
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
`;
