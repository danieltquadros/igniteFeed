import { useState } from "react";
import { ThumbsUp, Trash } from "phosphor-react";

// Components
import { Avatar } from "./Avatar";

// Assets
import profilePicture from "../assets/profile.png";

// Styles
import styles from "./Comment.module.css";

// Interfaces
import * as ILanguage from "../interfaces/ILanguage";

// Local interfaces
interface CommentProps {
  content: string;
  currentLanguage: ILanguage.model;
  onDeleteComment: (comment: string) => void;
}

export function Comment({
  content,
  currentLanguage,
  onDeleteComment,
}: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleLikeComment() {
    setLikeCount((prevState) => prevState + 1);
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src={profilePicture} alt="" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Someone else</strong>
              <time
                title={currentLanguage.comment.timeTitle}
                dateTime="2022-10-06 23:33:30"
              >
                {currentLanguage.comment.timeText}
              </time>
            </div>
            <button
              title={currentLanguage.comment.deleteCommentTextButton}
              onClick={handleDeleteComment}
            >
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            {currentLanguage.comment.clapButtonText} <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
