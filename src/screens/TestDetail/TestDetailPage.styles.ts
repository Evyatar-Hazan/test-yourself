import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const BackButton = styled.button`
  background: transparent;
  border: 1px solid ${(p) => p.theme.colors.outline};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background: ${(p) =>
      `color-mix(in srgb, ${p.theme.colors.text} 5%, transparent)`};
  }
`;

export const TestCard = styled.div`
  background: ${(p) => p.theme.colors.surface};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px
    ${(p) => `color-mix(in srgb, ${p.theme.colors.text} 10%, transparent)`};
  margin-bottom: 20px;
`;

export const TestHeader = styled.div`
  margin-bottom: 20px;
`;

export const TestTitle = styled.h1`
  color: ${(p) => p.theme.colors.text};
  margin-bottom: 8px;
`;

export const TestMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: ${(p) =>
    `color-mix(in srgb, ${p.theme.colors.text} 60%, transparent)`};
  font-size: 14px;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin: 20px 0;
`;

export const StatCard = styled.div`
  background: ${(p) =>
    `color-mix(in srgb, ${p.theme.colors.text} 3%, transparent)`};
  padding: 16px;
  border-radius: 8px;
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${(p) => p.theme.colors.primary};
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: ${(p) =>
    `color-mix(in srgb, ${p.theme.colors.text} 60%, transparent)`};
  margin-top: 4px;
`;

export const ActionButton = styled.button`
  background: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.surface};
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;

  &:hover {
    background: ${(p) =>
      `color-mix(in srgb, ${p.theme.colors.primary} 75%, black)`};
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: ${(p) =>
    `color-mix(in srgb, ${p.theme.colors.text} 60%, transparent)`};
`;

export const ErrorMessage = styled.div`
  background: ${(p) =>
    `color-mix(in srgb, ${p.theme.colors.danger} 10%, transparent)`};
  color: ${(p) => p.theme.colors.danger};
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
`;
