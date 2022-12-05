import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";

import profilePicture from "./assets/profile.png";
import styles from "./App.module.css";

import "./global.css";
import { useState } from "react";

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
      avatarUrl: profilePicture,
      name: "Someone from somewhere",
      role: "Web Developer Educator",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
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
  const [language, setLanguage] = useState<string>("EN");

  return (
    <div>
      <Header language={language} setLanguage={setLanguage} />

      <div className={styles.wrapper}>
        <Sidebar language={language} />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
                language={language}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}
