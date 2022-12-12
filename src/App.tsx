import { useEffect, useState } from "react";

// Components
import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";

// Utils
import englishLanguage from "./utils/englishLanguage";
import portugueseLanguage from "./utils/portugueseLanguage";

// Interfaces
import * as ILanguage from "./interfaces/ILanguage";

// Styles
import "./global.css";
import styles from "./App.module.css";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/danieltquadros.png",
      name: "Daniel Quadros",
      role: "Web Developer",
    },
    content: [
      { type: "paragraph", content: "Hello folks 👋" },
      {
        type: "paragraph",
        content:
          "I just uploaded another project to my portfolio. It's a NLW Return's project, a Rocketseat event. Project name is DoctorCare 🚀",
      },
      { type: "link", content: "jane.design/doctorcare" },
    ],
    publishedAt: new Date("2022-10-24 19:34:30"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "src/assets/profile.png",
      name: "Someone from somewhere",
      role: "Web Developer Educator",
    },
    content: [
      { type: "paragraph", content: "Hi dears! 👋" },
      {
        type: "paragraph",
        content:
          "I just uploaded another project to my portfolio. It's a NLW Return's project, a Rocketseat event. Project name is DoctorCare 🚀",
      },
      { type: "link", content: "jane.design/doctorcare" },
    ],
    publishedAt: new Date("2022-10-24 20:34:30"),
  },
];

export function App() {
  const [language, setLanguage] = useState("EN");
  const [currentLanguage, setCurrentLanguage] =
    useState<ILanguage.model>(englishLanguage);

  useEffect(() => {
    switch (language) {
      case "EN":
        setCurrentLanguage(englishLanguage);
        break;
      case "PT-BR":
        setCurrentLanguage(portugueseLanguage);
        break;
      default:
        setCurrentLanguage(englishLanguage);
        break;
    }
  }, [language]);

  return (
    <div>
      <Header
        language={language}
        setLanguage={setLanguage}
        currentLanguage={currentLanguage}
      />

      <div className={styles.wrapper}>
        <Sidebar currentLanguage={currentLanguage} />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
                currentLanguage={currentLanguage}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}
