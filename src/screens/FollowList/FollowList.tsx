import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Page,
  Title,
  ErrorText,
  UsersList,
  UserItem,
  Avatar,
  UserInfo,
  UserName,
  UserEmail,
  Chevron,
} from "./FollowList.styles";
import { selectAuth } from "../../features/auth/authSlice";
import { useTranslationTyped } from "../../hooks/useTranslationTyped";
import {
  fetchFollowers,
  fetchFollowing,
  fetchUserById,
} from "../../services/api";
import type { User } from "../../types";

type ListType = "followers" | "following";

const FollowList: React.FC<{ type: ListType }> = ({ type }) => {
  const { t } = useTranslationTyped();
  const navigate = useNavigate();
  const { userId } = useParams<{ userId?: string }>();
  const { user: me, isAuthenticated } = useSelector(selectAuth);

  const targetUserId = useMemo(() => userId || me?.id || "", [userId, me]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [targetUser, setTargetUser] = useState<User | null>(null);

  useEffect(() => {
    if (!targetUserId) {
      // אם אין מזהה ולא מחוברים, ננתב להתחברות
      if (!isAuthenticated) {
        navigate("/login");
      }
      return;
    }

    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [list, target] = await Promise.all([
          type === "followers"
            ? fetchFollowers(targetUserId)
            : fetchFollowing(targetUserId),
          fetchUserById(targetUserId),
        ]);
        if (cancelled) return;
        setUsers(list as User[]);
        setTargetUser(target);
      } catch (err) {
        if (cancelled) return;
        setError(
          err instanceof Error ? err.message : t("general.unknown_user"),
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [targetUserId, type, isAuthenticated, navigate, t]);

  const title = useMemo(() => {
    const base =
      type === "followers" ? t("profile.followers") : t("profile.following");
    if (targetUser && targetUser.name) {
      return `${base} · ${targetUser.name}`;
    }
    return base;
  }, [type, t, targetUser]);

  return (
    <Page>
      <Title>{title}</Title>

      {loading && <p>{t("home.loading")}</p>}
      {error && <ErrorText>{error}</ErrorText>}

      {!loading && !error && users.length === 0 && (
        <p>
          {type === "followers"
            ? t("profile.no_followers")
            : t("profile.no_following")}
        </p>
      )}

      {!loading && !error && users.length > 0 && (
        <UsersList>
          {users.map((u) => (
            <UserItem key={u.id} onClick={() => navigate(`/profile/${u.id}`)}>
              <Avatar
                src={`http://localhost:3001/public${u.avatarUrl || "/avataras/default-avatar.png"}`}
                alt={u.name}
              />
              <UserInfo>
                <UserName>{u.name}</UserName>
                <UserEmail>{u.email}</UserEmail>
              </UserInfo>
              <Chevron>›</Chevron>
            </UserItem>
          ))}
        </UsersList>
      )}
    </Page>
  );
};

export default FollowList;
