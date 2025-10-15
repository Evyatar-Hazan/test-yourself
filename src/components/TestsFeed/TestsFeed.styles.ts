import styled from "styled-components";

export const FeedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const TestCard = styled.div`
  border: 1px solid ${(p) => p.theme.colors.outline};
  border-radius: 8px;
  padding: 16px;
  background: ${(p) => p.theme.colors.surface};
  box-shadow: 0 2px 8px
    ${(p) => `color-mix(in srgb, ${p.theme.colors.text} 4%, transparent)`};
`;
