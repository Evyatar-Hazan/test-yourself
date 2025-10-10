import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AvatarImg, Row, Username } from "./TestsFeed.extras.styles";
import { FeedGrid, TestCard } from "./TestsFeed.styles";
import { fetchTests } from "../../features/tests/testsSlice";
import { fetchUsers } from "../../features/users/usersSlice";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";
import type { AppDispatch } from "../../store";
import { RootState } from "../../store";
import { getTestStatistics } from "../../utils/testStatistics";
import TestInteractions from "../TestInteractions/TestInteractions";

const TestsFeed: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslationTyped();
  const { tests, loading, page, hasMore } = useSelector(
    (state: RootState) => state.tests,
  );
  const { data: users } = useSelector((state: RootState) => state.users);
  const loader = useRef<HTMLDivElement | null>(null);

  const currentUserId = "u1"; // Hardcoded for demo

  // טעינה ראשונית של המבחנים והמשתמשים
  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
    if (tests.length === 0 && !loading) {
      dispatch(fetchTests({ page: 1 }));
    }
  }, [dispatch, tests.length, loading, users.length]);

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
          const user = users.find((u) => u.id === test.ownerId);
          return (
            <TestCard
              key={test.id}
              onClick={() => navigate(`/test/${test.id}`)}
            >
              <Row>
                {user && user.avatarUrl && (
                  <AvatarImg
                    src={`http://localhost:3001/public${user.avatarUrl}`}
                    alt={user.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/profile/${user.id}`);
                    }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        `http://localhost:3001/public/avataras/default-avatar.png`;
                    }}
                  />
                )}
                <Username
                  onClick={(e) => {
                    e.stopPropagation();
                    if (user) {
                      navigate(`/profile/${user.id}`);
                    }
                  }}
                >
                  {user ? user.name : t("general.unknown_user")}
                </Username>
              </Row>
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

              <TestInteractions
                testId={test.id}
                testLikes={test.likes}
                currentUserId={currentUserId}
                onNavigateToTest={() => navigate(`/test/${test.id}`)}
                onNavigateToExam={() => navigate(`/exam/${test.id}`)}
              />
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
