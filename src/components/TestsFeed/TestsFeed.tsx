import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FeedGrid, TestCard } from "./TestsFeed.styles";
import { fetchTests } from "../../features/tests/testsSlice";
import usersData from "../../mocks/users.json";
import type { AppDispatch } from "../../store";
import { RootState } from "../../store";

const TestsFeed: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { tests, loading, page, hasMore } = useSelector(
    (state: RootState) => state.tests,
  );
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loader.current) return;
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new window.IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        dispatch(fetchTests({ page: page + 1 }));
      }
    }, option);
    observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [dispatch, hasMore, loading, page]);

  const navigate = useNavigate();

  return (
    <>
      <FeedGrid>
        {tests.map((test) => {
          const user = usersData.find((u) => u.id === test.ownerId);
          return (
            <TestCard
              key={test.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/test/${test.id}`)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                {user && user.avatarUrl && (
                  <img
                    src={
                      user.avatarUrl.startsWith("http")
                        ? user.avatarUrl
                        : `${process.env.PUBLIC_URL}${user.avatarUrl}`
                    }
                    alt={user.name}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      marginRight: 8,
                      objectFit: "cover",
                      background: "#eee",
                    }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        `${process.env.PUBLIC_URL}/default-avatar.png`;
                    }}
                  />
                )}
                <span style={{ fontWeight: 500 }}>
                  {user ? user.name : t("unknown_user")}
                </span>
              </div>
              <h3>{test.subject}</h3>
              <p>
                {t("tests_average_score")}: {test.averageScore} |{" "}
                {t("tests_questions")}: {test.questionsCount} | {t("score")}:{" "}
                {test.score}
              </p>
              <p>
                {t("average_correct")}: {test.averageCorrect}
              </p>
            </TestCard>
          );
        })}
      </FeedGrid>
      {loading && <p>{t("home_loading")}</p>}
      <div ref={loader} />
      {!hasMore && <p>{t("home_no_more_tests")}</p>}
    </>
  );
};
export default TestsFeed;
