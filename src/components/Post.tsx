import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

// date-fns
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import enUS from "date-fns/esm/locale/en-US";

// Components
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";

// Styles
import styles from "./Post.module.css";

// Interfaces
import * as ILanguage from "../interfaces/ILanguage";

// Local interfaces
interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: string;
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
  currentLanguage: ILanguage.model;
}

export function Post({
  author,
  publishedAt,
  content,
  currentLanguage,
}: PostProps) {
  const [newCommentText, setNewCommentText] = useState("");
  const [comments, setComments] = useState(["It's a very cool post huh?!?!"]);

  const publishedDateFormatted = () => {
    switch (currentLanguage.languageName) {
      case "EN":
        return format(publishedAt, "LLLL',' d 'at' HH:mm'h'", {
          locale: enUS,
        });
      case "PT-BR":
        return format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
          locale: ptBR,
        });
      default:
        return format(publishedAt, "LLLL',' d 'at' HH:mm'h'", {
          locale: enUS,
        });
    }
  };

  const publishedDateRelativeToNow = () => {
    switch (currentLanguage.languageName) {
      case "EN":
        return formatDistanceToNow(publishedAt, {
          locale: enUS,
          addSuffix: true,
        });
      case "PT-BR":
        return formatDistanceToNow(publishedAt, {
          locale: ptBR,
          addSuffix: true,
        });
      default:
        return formatDistanceToNow(publishedAt, {
          locale: enUS,
          addSuffix: true,
        });
    }
  };

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity(currentLanguage.post.requiredField);
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeleteOne = comments.filter((comment) => {
      return comment !== commentToDelete;
    });
    setComments(commentsWithoutDeleteOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted()}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow()}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>{currentLanguage.post.sendFeedback}</strong>
        <textarea
          name="comment"
          placeholder={currentLanguage.post.placeholderComment}
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            {currentLanguage.post.publishTextButton}
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              currentLanguage={currentLanguage}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
