import styled from "styled-components";

export const Page = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const InfoBanner = styled.div`
  margin-bottom: 16px;
  text-align: center;
  padding: 12px;
  background-color: #e3f2fd;
  border-radius: 8px;
  border: 1px solid #2196f3;

  p {
    margin: 0 0 8px 0;
    font-size: 14px;
    color: #1976d2;
  }
`;

export const GridStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Centered = styled.div`
  padding: 20px;
  text-align: center;
`;

export const SectionTitle = styled.h3`
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: bold;
`;

export const EmptyState = styled.p`
  text-align: center;
  color: #6c757d;
  padding: 40px;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-size: 16px;
`;
