import styled from "styled-components";

export const ProfileContainer = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  max-width: 800px;
  margin: 0 auto;
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.lg};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid ${(props) => props.theme.colors.outline};
  }

  h2 {
    margin: 0;
    color: ${(props) => props.theme.colors.text};
    font-size: ${(props) => props.theme.typography.fontSize.xl};
    font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  }

  p {
    margin: ${(props) => props.theme.spacing.xs} 0 0 0;
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.typography.fontSize.sm};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    flex-direction: column;
    text-align: center;
  }

  .profile-meta {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.md};
    margin-top: ${(props) => props.theme.spacing.sm};

    .counter {
      color: ${(props) => props.theme.colors.secondary};
      font-size: ${(props) => props.theme.typography.fontSize.sm};
    }

    .counter.clickable {
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    .error-text {
      color: ${(props) => props.theme.colors.danger};
    }
  }
`;

export const ProfileStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.lg};

  .stat {
    text-align: center;
    padding: ${(props) => props.theme.spacing.md};
    background: ${(props) => props.theme.colors.surface};
    border-radius: ${(props) => props.theme.radius.md};
    border: 1px solid ${(props) => props.theme.colors.outline};

    h3 {
      margin: 0 0 ${(props) => props.theme.spacing.xs} 0;
      color: ${(props) => props.theme.colors.primary};
      font-size: ${(props) => props.theme.typography.fontSize.xl};
      font-weight: ${(props) => props.theme.typography.fontWeight.bold};
    }

    p {
      margin: 0;
      color: ${(props) => props.theme.colors.text};
      font-size: ${(props) => props.theme.typography.fontSize.sm};
    }
  }
`;

export const TestsList = styled.div`
  margin-top: ${(props) => props.theme.spacing.md};

  .test-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${(props) => props.theme.spacing.md};
    background: ${(props) => props.theme.colors.surface};
    border: 1px solid ${(props) => props.theme.colors.outline};
    border-radius: ${(props) => props.theme.radius.md};
    margin-bottom: ${(props) => props.theme.spacing.sm};
    cursor: pointer;
    transition:
      transform 0.2s,
      box-shadow 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px
        ${(props) =>
          `color-mix(in srgb, ${props.theme.colors.text} 15%, transparent)`};
    }

    .test-info {
      flex: 1;

      .test-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      h4 {
        margin: 0 0 ${(props) => props.theme.spacing.xs} 0;
        color: ${(props) => props.theme.colors.text};
        font-size: ${(props) => props.theme.typography.fontSize.lg};
        font-weight: ${(props) => props.theme.typography.fontWeight.medium};
      }

      p {
        margin: ${(props) => props.theme.spacing.xs} 0 0 0;
        color: ${(props) => props.theme.colors.secondary};
        font-size: ${(props) => props.theme.typography.fontSize.sm};
      }
    }

    .test-actions {
      flex-shrink: 0;
      margin-left: ${(props) => props.theme.spacing.md};
    }

    .arrow {
      font-size: 20px;
      color: ${(props) => props.theme.colors.primary};
      user-select: none;
    }

    @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
      flex-direction: column;
      align-items: stretch;

      .test-actions {
        margin-left: 0;
        margin-top: ${(props) => props.theme.spacing.md};
      }
    }
  }
`;
