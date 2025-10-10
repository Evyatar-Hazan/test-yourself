import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Actions,
  DangerButton,
  Page,
  Pill,
  PrimaryLink,
  SecondaryLink,
  SuccessLink,
  TopBar,
} from "./Home.styles";
import TestsFeed from "../../components/TestsFeed/TestsFeed";
import { logoutUser } from "../../features/auth/authSlice";
import { fetchUsers } from "../../features/users/usersSlice";
import { useAuth } from "../../hooks/useAuth";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";
import type { AppDispatch } from "../../store";

const Home: React.FC = () => {
  const { t } = useTranslationTyped();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Page>
      <TopBar>
        <h1>{t("home.title")}</h1>
        <Actions>
          {!isAuthenticated ? (
            <>
              <SecondaryLink to="/login">{t("homeAuth.login")}</SecondaryLink>
              <SuccessLink to="/signup">{t("homeAuth.signup")}</SuccessLink>
            </>
          ) : (
            <>
              <Pill>
                {t("homeAuth.hello_name", { name: user?.name ?? "" })}
              </Pill>
              <DangerButton onClick={handleLogout}>
                {t("homeAuth.logout")}
              </DangerButton>
            </>
          )}
          <SuccessLink to="/create-test">
            {t("navigation.createTest")}
          </SuccessLink>
          <PrimaryLink to="/profile">{t("navigation.profile")}</PrimaryLink>
        </Actions>
      </TopBar>
      <TestsFeed />
    </Page>
  );
};

export default Home;
