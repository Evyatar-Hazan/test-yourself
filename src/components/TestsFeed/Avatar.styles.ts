import styled from "styled-components";

export const Img = styled.img<{ size?: number }>`
  width: ${(p) => (p.size ? `${p.size}px` : "40px")};
  height: ${(p) => (p.size ? `${p.size}px` : "40px")};
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #eee;
  background: #fafafa;
`;
