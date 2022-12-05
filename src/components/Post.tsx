import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import enUS from "date-fns/esm/locale/en-US";
import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useEffect,
  useState,
} from "react";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";

import styles from "./Post.module.css";

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
  language: string;
}

export function Post({ author, publishedAt, content, language }: PostProps) {
  const [newCommentText, setNewCommentText] = useState("");
  const [comments, setComments] = useState(["It's a very cool post huh?!?!"]);

  const [sendFeedback, setSendFeedback] = useState("Send feedback");
  const [placeholderComment, setPlaceholderComment] = useState("Add a comment");
  const [requiredField, setRequiredField] = useState("Required field");
  const [publishTextButton, setPublishTextButton] = useState("Publish");
  const [publishedDateFormatted, setPublishedDateFormatted] = useState(
    format(publishedAt, "LLLL',' d 'at' HH:mm'h'", {
      locale: enUS,
    })
  );
  const [publishedDateRelativeToNow, setPublishedDateRelativeToNow] = useState(
    formatDistanceToNow(publishedAt, {
      locale: enUS,
      addSuffix: true,
    })
  );

  useEffect(() => {
    switch (language) {
      case "EN":
        setSendFeedback("Send feedback");
        setPlaceholderComment("Add a comment");
        setRequiredField("Required field");
        setPublishTextButton("Publish");
        setPublishedDateFormatted(
          format(publishedAt, "LLLL',' d 'at' HH:mm'h'", {
            locale: enUS,
          })
        );
        setPublishedDateRelativeToNow(
          formatDistanceToNow(publishedAt, {
            locale: enUS,
            addSuffix: true,
          })
        );
        break;
      case "PT-BR":
        setSendFeedback("Deixe seu feedback");
        setPlaceholderComment("Deixe seu comentário");
        setRequiredField("Este campo é obrigatório!");
        setPublishTextButton("Publicar");
        setPublishedDateFormatted(
          format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
            locale: ptBR,
          })
        );
        setPublishedDateRelativeToNow(
          formatDistanceToNow(publishedAt, {
            locale: ptBR,
            addSuffix: true,
          })
        );
        break;
      default:
        setSendFeedback("Send feedback");
        setPlaceholderComment("Add a comment");
        setRequiredField("Required field");
        setPublishTextButton("Publish");
        setPublishedDateFormatted(
          format(publishedAt, "LLLL',' d 'at' HH:mm'h'", {
            locale: enUS,
          })
        );
        setPublishedDateRelativeToNow(
          formatDistanceToNow(publishedAt, {
            locale: enUS,
            addSuffix: true,
          })
        );
        break;
    }
  }, [language]);

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
    event.target.setCustomValidity(requiredField);
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
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
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
        <strong>{sendFeedback}</strong>
        <textarea
          name="comment"
          placeholder={placeholderComment}
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            {publishTextButton}
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              language={language}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
