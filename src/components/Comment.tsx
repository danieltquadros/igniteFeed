import { ThumbsUp, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { Avatar } from "./Avatar";

import profilePicture from "../assets/profile.png";
import styles from "./Comment.module.css";

interface CommentProps {
  content: string;
  language: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, language, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  const [timeTitle, setTimeTitle] = useState("October 6th at 11:33 pm");
  const [timeText, setTimeText] = useState("About 1h ago");
  const [deleteCommentTextButton, setDeleteCommentTextButton] =
    useState("Delete comment");
  const [clapButtonText, setClapButtonText] = useState("Clap");

  useEffect(() => {
    switch (language) {
      case "EN":
        setTimeTitle("October 6th at 11:33 pm");
        setTimeText("About 1h ago");
        setDeleteCommentTextButton("Delete comment");
        setClapButtonText("Clap");
        break;
      case "PT-BR":
        setTimeTitle("06 de outubro às 23:33");
        setTimeText("Cerca de 1h atrás");
        setDeleteCommentTextButton("Deletar comentário");
        setClapButtonText("Aplaudir");
        break;
      default:
        setTimeTitle("October 6th at 11:33 pm");
        setTimeText("About 1h ago");
        setDeleteCommentTextButton("Delete comment");
        setClapButtonText("Clap");
        break;
    }
  }, [language]);

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
              <time title={timeTitle} dateTime="2022-10-06 23:33:30">
                {timeText}
              </time>
            </div>
            <button
              title={deleteCommentTextButton}
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
            {clapButtonText} <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
