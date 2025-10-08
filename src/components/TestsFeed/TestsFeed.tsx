import React, { useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { FeedGrid, TestCard } from "./TestsFeed.styles";
import { fetchTests } from "../../features/tests/testsSlice";
import type { AppDispatch } from "../../store";
import { RootState } from "../../store";

const TestsFeed: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { tests, loading, page, hasMore } = useSelector(
    (state: RootState) => state.tests,
  );
  const loader = useRef<HTMLDivElement | null>(null);

  // טעינה ראשונית
  useEffect(() => {
    if (tests.length === 0) {
      dispatch(fetchTests({ page: 1 }));
    }
  }, [dispatch, tests.length]);

  // אינטרסקשן לטעינה אינסופית
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        dispatch(fetchTests({ page: page + 1 }));
      }
    },
    [dispatch, hasMore, loading, page],
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

  return (
    <>
      <FeedGrid>
        {tests.map((test) => (
          <TestCard key={test.id}>
            <h3>{test.subject}</h3>
            <p>
              {t("tests_average_score")}: {test.averageScore} |{" "}
              {t("tests_questions")}: {test.questionsCount} | {t("score")}:{" "}
              {test.score}
            </p>
            {/* <p>
              {t("test_taken_at", {
                date: new Date(test.takenAt).toLocaleDateString(),
              })}
            </p> */}
          </TestCard>
        ))}
      </FeedGrid>
      {loading && <p>{t("home_loading")}</p>}
      <div ref={loader} />
      {!hasMore && <p>{t("home_no_more_tests")}</p>}
    </>
  );
};

export default TestsFeed;
