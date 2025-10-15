import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  Page,
  InfoBanner,
  GridStats,
  Centered,
  SectionTitle,
  EmptyState,
} from "./Profile.extras.styles";
import { ProfileHeader, TestsList } from "./Profile.styles";
import Button from "../../components/Button/Button";
import { selectAuth } from "../../features/auth/authSlice";
import {
  followUser as followUserThunk,
  unfollowUser as unfollowUserThunk,
} from "../../features/auth/authSlice";
import { selectUsers, updateUser } from "../../features/users/usersSlice";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";
import { fetchUserById } from "../../services/api";
import type { RootState, AppDispatch } from "../../store";
import type { TestEntity } from "../../types";
import {
  calculateUserStatistics,
  findUserById,
  getUserTests,
} from "../../utils/userProfile";

const Profile: React.FC = () => {
  const { t } = useTranslationTyped();
  const { userId } = useParams<{ userId?: string }>();
  const navigate = useNavigate();
  const users = useSelector(selectUsers);
  const { tests } = useSelector((state: RootState) => state.tests);
  const {
    user: me,
    isAuthenticated,
    isLoading: authLoading,
    error: authError,
  } = useSelector(selectAuth);
  const dispatch = useDispatch<AppDispatch>();
  const [isMobile, setIsMobile] = useState(false);

  // מזהה היוזר להצגה: קודם מזהה מה-URL, אחרת היוזר המחובר, אחרת ברירת מחדל
  const currentUserId = userId || me?.id || "u1";
  // האם צופים ביוזר אחר? משווים מול היוזר המחובר אם קיים
  const isViewingOtherUser = Boolean(userId && userId !== (me?.id || "u1"));

  // Hook לזיהוי אם זה מובייל
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // חיפוש המשתמש הנוכחי
  const currentUser = findUserById(currentUserId, users);

  const followerCount = currentUser?.followers?.length ?? 0;
  const followingCount = currentUser?.following?.length ?? 0;
  const amIFollowing = useMemo(() => {
    if (!me || !currentUser) return false;
    return (me.following ?? []).includes(currentUser.id);
  }, [me, currentUser]);

  const onToggleFollow = async () => {
    if (!currentUser) return;
    if (!me || !isAuthenticated) {
      navigate("/login");
      return;
    }
    if (amIFollowing) {
      await dispatch(unfollowUserThunk(currentUser.id));
    } else {
      await dispatch(followUserThunk(currentUser.id));
    }
    // Refresh viewed user's data so counters update
    const refreshed = await fetchUserById(currentUser.id);
    if (refreshed) {
      dispatch(updateUser(refreshed));
    }
  };

  // חישוב סטטיסטיקות המשתמש
  const statistics = calculateUserStatistics(currentUserId, tests);
  const userCreatedTests = getUserTests(currentUserId, tests, "created");

  if (!currentUser) {
    return (
      <Centered>
        <p>{t("general.unknown_user")}</p>
      </Centered>
    );
  }

  return (
    <Page>
      {/* כפתור לחזרה לפרופיל האישי */}
      {isViewingOtherUser && (
        <InfoBanner>
          <p>
            {currentUser
              ? `צופה בפרופיל של ${currentUser.name}`
              : "צופה בפרופיל של משתמש אחר"}
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate("/profile")}
          >
            {t("profile.my_profile")}
          </Button>
        </InfoBanner>
      )}

      {/* פרופיל הדר */}
      <ProfileHeader>
        <img
          src={`http://localhost:3001/public${currentUser.avatarUrl}`}
          alt={currentUser.name}
        />
        <div>
          <h2>{currentUser.name}</h2>
          <p>{currentUser.email}</p>
          <div className="profile-meta">
            <span className="counter">
              {t("profile.followers")}: {followerCount}
            </span>
            <span className="counter">
              {t("profile.following")}: {followingCount}
            </span>
            {isViewingOtherUser && (
              <Button
                variant={amIFollowing ? "secondary" : "primary"}
                size="sm"
                onClick={onToggleFollow}
                disabled={authLoading}
              >
                {amIFollowing ? t("profile.unfollow") : t("profile.follow")}
              </Button>
            )}
            {!!authError && (
              <span className="counter error-text">{authError}</span>
            )}
          </div>
        </div>
      </ProfileHeader>

      {/* סטטיסטיקות */}
      <GridStats>
        <div className="stat">
          <h3>{statistics.testsTaken}</h3>
          <p>{t("profile.tests_taken")}</p>
        </div>
        <div className="stat">
          <h3>{statistics.averageScore}%</h3>
          <p>{t("profile.average_score")}</p>
        </div>
        <div className="stat">
          <h3>{statistics.testsCreated}</h3>
          <p>{t("profile.tests_created")}</p>
        </div>
      </GridStats>

      {/* מבחנים שיצר */}
      <div>
        <SectionTitle>{t("profile.created_tests")}</SectionTitle>
        {userCreatedTests.length === 0 ? (
          <EmptyState>{t("profile.no_created_tests")}</EmptyState>
        ) : (
          <TestsList>
            {userCreatedTests.map((test: TestEntity) => (
              <div
                key={test.id}
                className="test-item"
                onClick={() => navigate(`/test/${test.id}`)}
              >
                <div className="test-info">
                  <div className="test-row">
                    <h4>{test.subject}</h4>
                    <span className="arrow">▶</span>
                  </div>
                  <div>
                    <p>
                      {t("tests.questions")}: {test.questionsCount}
                    </p>
                    <p>
                      {t("tests.respondents")}: {test.respondentsCount}
                    </p>
                    <p>
                      {t("tests.average_score")}:{test.averageScore.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="test-actions">
                  <Button
                    size="sm"
                    variant="primary"
                    fullWidth={isMobile}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/test/${test.id}`);
                    }}
                  >
                    {t("profile.take_test")}
                  </Button>
                </div>
              </div>
            ))}
          </TestsList>
        )}
      </div>
    </Page>
  );
};

export default Profile;
