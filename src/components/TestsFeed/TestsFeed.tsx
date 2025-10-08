import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FeedGrid, TestCard } from "./TestsFeed.styles";
import { fetchTests } from "../../features/tests/testsSlice";
import usersData from "../../mocks/users.json";
import type { AppDispatch } from "../../store";
import { RootState } from "../../store";
import { getTestStatistics } from "../../utils/testStatistics";

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
                  {user ? user.name : t("general.unknown_user")}
                </span>
              </div>
              <h3>{test.subject}</h3>
              <p>
                {(() => {
                  const updatedStats = getTestStatistics(test.id);
                  const averageScore =
                    updatedStats?.averageScore || test.averageScore;
                  const respondentsCount =
                    updatedStats?.respondentsCount || test.respondentsCount;

                  return (
                    <>
                      {t("tests.average_score")}: {averageScore} |{" "}
                      {t("tests.questions")}: {test.questionsCount} |{" "}
                      {"משתתפים"}: {respondentsCount}
                    </>
                  );
                })()}
              </p>
              <p>
                {(() => {
                  const updatedStats = getTestStatistics(test.id);
                  const averageCorrect =
                    updatedStats?.averageCorrect || test.averageCorrect;
                  return `${t("general.average_correct")}: ${averageCorrect}`;
                })()}
              </p>
            </TestCard>
          );
        })}
      </FeedGrid>
      {loading && <p>{t("home.loading")}</p>}
      <div ref={loader} />
      {!hasMore && <p>{t("home.no_more_tests")}</p>}
    </>
  );
};
export default TestsFeed;
