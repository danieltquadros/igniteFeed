import { PencilLine } from "phosphor-react";
import { useEffect, useState } from "react";
import { Avatar } from "./Avatar";

import styles from "./Sidebar.module.css";

interface PropsSideBar {
  language: string;
}

export function Sidebar({ language }: PropsSideBar) {
  const [editProfile, setEditProfile] = useState("Edit profile");

  useEffect(() => {
    switch (language) {
      case "EN":
        setEditProfile("Edit profile");
        break;
      case "PT-BR":
        setEditProfile("Editar seu perfil");
        break;
      default:
        setEditProfile("Edit profile");
        break;
    }
  }, [language]);

  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50"
      />
      <div className={styles.profile}>
        <Avatar src="https://github.com/danieltquadros.png" />
        <strong>Daniel Quadros</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} />
          {editProfile}
        </a>
      </footer>
    </aside>
  );
}
