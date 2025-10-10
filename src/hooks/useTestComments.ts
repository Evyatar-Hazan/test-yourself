import { useState, useEffect } from "react";
import {
  fetchTestComments,
  addTestComment,
  updateTestComment,
  deleteTestComment,
  toggleTestCommentLike,
  toggleTestLike,
} from "../services/api";
import type { TestComment } from "../types/test";

export const useTestComments = (testId: string) => {
  const [comments, setComments] = useState<TestComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadComments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTestComments(testId);
      setComments(data);
    } catch (err) {
      setError("שגיאה בטעינת התגובות");
      console.error("Error loading comments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (testId) {
      loadComments();
    }
  }, [testId]);

  const handleAddComment = async (
    testIdParam: string,
    body: string,
    parentId?: string,
  ) => {
    try {
      // For demo purposes, using a hardcoded user ID
      // In a real app, this would come from authentication context
      const currentUserId = "u1";

      const newComment = await addTestComment(
        testIdParam,
        currentUserId,
        body,
        parentId,
      );

      if (newComment) {
        // Reload comments to get the updated structure
        await loadComments();
      }
    } catch (err) {
      setError("שגיאה בהוספת התגובה");
      console.error("Error adding comment:", err);
    }
  };

  const handleUpdateComment = async (
    testIdParam: string,
    commentId: string,
    body: string,
  ) => {
    try {
      const success = await updateTestComment(testIdParam, commentId, body);
      if (success) {
        await loadComments();
      } else {
        setError("שגיאה בעדכון התגובה");
      }
    } catch (err) {
      setError("שגיאה בעדכון התגובה");
      console.error("Error updating comment:", err);
    }
  };

  const handleDeleteComment = async (
    testIdParam: string,
    commentId: string,
  ) => {
    try {
      const success = await deleteTestComment(testIdParam, commentId);
      if (success) {
        await loadComments();
      } else {
        setError("שגיאה במחיקת התגובה");
      }
    } catch (err) {
      setError("שגיאה במחיקת התגובה");
      console.error("Error deleting comment:", err);
    }
  };

  const handleToggleCommentLike = async (
    testIdParam: string,
    commentId: string,
    userId: string,
  ) => {
    try {
      const success = await toggleTestCommentLike(
        testIdParam,
        commentId,
        userId,
      );
      if (success) {
        await loadComments();
      }
    } catch (err) {
      console.error("Error toggling comment like:", err);
    }
  };

  const handleToggleTestLike = async (testIdParam: string, userId: string) => {
    try {
      const success = await toggleTestLike(testIdParam, userId);
      if (success) {
        // Note: This hook focuses on comments,
        // test likes would be handled by a parent component
        console.log("Test like toggled successfully");
      }
    } catch (err) {
      console.error("Error toggling test like:", err);
    }
  };

  return {
    comments,
    loading,
    error,
    handleAddComment,
    handleUpdateComment,
    handleDeleteComment,
    handleToggleCommentLike,
    handleToggleTestLike,
    refreshComments: loadComments,
  };
};
