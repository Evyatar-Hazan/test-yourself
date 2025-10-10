import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import { selectUsers } from "../../features/users/usersSlice";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";
import type { RootState } from "../../store";
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
  const [isMobile, setIsMobile] = useState(false);

  // אם לא מועבר userId בURL, נשתמש במשתמש ברירת מחדל
  const currentUserId = userId || "u1";
  const isViewingOtherUser = userId && userId !== "u1";

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
