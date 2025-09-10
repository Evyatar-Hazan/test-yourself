import React from "react";
import { useEffect } from "react";
import {
  fetchComments,
  selectComments,
  selectCommentsLoading,
} from "../../features/comments/commentsSlice";
import {
  fetchPosts,
  selectPosts,
  selectPostsLoading,
} from "../../features/posts/postsSlice";
import {
  fetchTests,
  selectTests,
  selectTestsLoading,
} from "../../features/tests/testsSlice";
import {
  fetchUsers,
  selectUsers,
  selectUsersLoading,
} from "../../features/users/usersSlice";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);
  const posts = useAppSelector(selectPosts);
  const tests = useAppSelector(selectTests);
  const comments = useAppSelector(selectComments);

  const usersLoading = useAppSelector(selectUsersLoading);
  const postsLoading = useAppSelector(selectPostsLoading);
  const testsLoading = useAppSelector(selectTestsLoading);
  const commentsLoading = useAppSelector(selectCommentsLoading);

  useEffect(() => {
    void dispatch(fetchUsers());
    void dispatch(fetchPosts());
    void dispatch(fetchTests());
    void dispatch(fetchComments());
  }, [dispatch]);

  const { t } = useTranslationTyped();

  return (
    <div style={{ padding: 16 }}>
      <h2>{t("home_title")}</h2>

      <section>
        <h3>
          {t("home_users_title")} {usersLoading ? t("home_loading") : ""}
        </h3>
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              {u.name} (@{u.username})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>
          {t("home_posts_title")} {postsLoading ? t("home_loading") : ""}
        </h3>
        <ul>
          {posts.map((p) => (
            <li key={p.id}>
              <strong>{p.title}</strong> — {p.body}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>
          {t("home_tests_title")} {testsLoading ? t("home_loading") : ""}
        </h3>
        <ul>
          {tests.map((t) => (
            <li key={t.id}>
              {t.subject}: {t.score}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>
          {t("home_comments_title")} {commentsLoading ? t("home_loading") : ""}
        </h3>
        <ul>
          {comments.map((c) => (
            <li key={c.id}>{c.body}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
