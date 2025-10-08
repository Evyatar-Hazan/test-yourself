import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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

interface ProfileProps {
  userId?: string; // אם לא מועבר, נראה פרופיל של המשתמש הנוכחי
}

const Profile: React.FC<ProfileProps> = ({ userId = "u1" }) => {
  const { t } = useTranslationTyped();
  const users = useSelector(selectUsers);
  const { tests } = useSelector((state: RootState) => state.tests);
  const [isMobile, setIsMobile] = useState(false);

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
  const currentUser = findUserById(userId, users);

  // חישוב סטטיסטיקות המשתמש
  const statistics = calculateUserStatistics(userId, tests);
  const userCreatedTests = getUserTests(userId, tests, "created");

  if (!currentUser) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>{t("general.unknown_user")}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: isMobile ? "16px" : "20px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {/* פרופיל הדר */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "32px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          flexDirection: isMobile ? "column" : "row",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        <img
          src={`/${currentUser.avatarUrl}`}
          alt={currentUser.name}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #e9ecef",
          }}
        />
        <div>
          <h2
            style={{
              margin: "0 0 8px 0",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {currentUser.name}
          </h2>
          <p style={{ margin: "0", color: "#6c757d", fontSize: "16px" }}>
            @{currentUser.username}
          </p>
        </div>
      </div>

      {/* סטטיסטיקות */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#ffffff",
            border: "1px solid #e9ecef",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{ margin: "0 0 8px 0", fontSize: "28px", color: "#007bff" }}
          >
            {statistics.testsTaken}
          </h3>
          <p style={{ margin: "0", fontSize: "14px", color: "#6c757d" }}>
            {t("profile.tests_taken")}
          </p>
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#ffffff",
            border: "1px solid #e9ecef",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{ margin: "0 0 8px 0", fontSize: "28px", color: "#28a745" }}
          >
            {statistics.averageScore}%
          </h3>
          <p style={{ margin: "0", fontSize: "14px", color: "#6c757d" }}>
            {t("profile.average_score")}
          </p>
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#ffffff",
            border: "1px solid #e9ecef",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{ margin: "0 0 8px 0", fontSize: "28px", color: "#dc3545" }}
          >
            {statistics.testsCreated}
          </h3>
          <p style={{ margin: "0", fontSize: "14px", color: "#6c757d" }}>
            {t("profile.tests_created")}
          </p>
        </div>
      </div>

      {/* מבחנים שיצר */}
      <div style={{ marginTop: "32px" }}>
        <h3
          style={{ marginBottom: "16px", fontSize: "20px", fontWeight: "bold" }}
        >
          {t("profile.created_tests")}
        </h3>
        {userCreatedTests.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#6c757d",
              padding: "40px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          >
            {t("profile.no_created_tests")}
          </p>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {userCreatedTests.map((test: TestEntity) => (
              <div
                key={test.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "stretch" : "center",
                  flexDirection: isMobile ? "column" : "row",
                  padding: "20px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e9ecef",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  gap: isMobile ? "16px" : "0",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  >
                    {test.subject}
                  </h4>
                  <div style={{ fontSize: "14px", color: "#6c757d" }}>
                    <p style={{ margin: "4px 0" }}>
                      {t("tests.questions")}: {test.questionsCount}
                    </p>
                    <p style={{ margin: "4px 0" }}>
                      {t("tests.respondents")}: {test.respondentsCount}
                    </p>
                    <p style={{ margin: "4px 0" }}>
                      {t("tests.average_score")}: {test.averageScore.toFixed(1)}
                      %
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: isMobile ? "0" : "16px",
                    alignSelf: isMobile ? "stretch" : "auto",
                  }}
                >
                  <Button size="sm" variant="secondary" fullWidth={isMobile}>
                    {t("profile.view_test")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
