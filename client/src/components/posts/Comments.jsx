import React, { useEffect, useState } from "react";
import { useUser } from "../../services/UserContext";
import ApiService from "../../services/ApiService";
import styles from "./Posts.module.css";

const Comments = ({ post, setError }) => {
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [comments, setComments] = useState([]);
  const { currentUser } = useUser();

  useEffect(() => {
    if (!post?.id) return;
    const fetchComments = async () => {
      try {
        const data = await ApiService.request({
          url: `http://localhost:3000/posts/${post.id}/comments`,
        });
        setComments(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchComments();
  }, [post?.id]);

  const handleAddComment = async () => {
    try {
      const newCommentData = {
        postId: post.id,
        body: newComment,
        email: currentUser.email,
      };
      const savedComment = await ApiService.request({
        url: `http://localhost:3000/posts/${post.id}/comments`,
        method: "POST",
        body: newCommentData,
      });
      setComments((prev = []) => [...prev, savedComment]);
      setNewComment("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditComment = async (commentId, index) => {
    try {
      await ApiService.request({
        url: `http://localhost:3000/posts/${post.id}/comments/${commentId}`,
        method: "PATCH",
        body: { body: editedComment },
      });
      setComments((prev) => {
        const updatedComments = [...prev];
        updatedComments[index] = { ...updatedComments[index], body: editedComment };
        return updatedComments;
      });
      setEditingComment(null);
      setEditedComment("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await ApiService.request({
        url: `http://localhost:3000/posts/${post.id}/comments/${commentId}`,
        method: "DELETE",
      });
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  return (
    <div className={styles.commentsContainer}>
      <h4 className={styles.commentsHeader}>Comments</h4>
      {comments ? (
        comments.map((comment, index) => (
          <div key={comment.id} className={styles.commentCard}>
            <p>{comment.body}</p>
            <small>
              By: {comment.email === currentUser.email ? "You" : comment.email || "Unknown User"}
            </small>
            {comment.email === currentUser.email && (
              <div className={styles.commentActions}>
                {editingComment === comment.id ? (
                  <>
                    <textarea
                      className={styles.addPostTextarea}
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                    ></textarea>
                    <button
                      className={styles.addButton}
                      onClick={() => handleEditComment(comment.id, index)}
                    >
                      Save
                    </button>
                    <button
                      className={styles.cancelButton}
                      onClick={() => setEditingComment(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={styles.editButton}
                      onClick={() => {
                        setEditingComment(comment.id);
                        setEditedComment(comment.body);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      🗑️
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}
      <textarea
        className={styles.addPostTextarea}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      ></textarea>
      <button className={styles.addButton} onClick={handleAddComment}>
        Add Comment
      </button>
    </div>
  );
};

export default Comments;
