import styles from "./Header.module.css";

import igniteLogo from "../assets/ignite-logo.svg";
import americanFlag from "../assets/americanflag.svg";
import brazilianFlag from "../assets/brazilianflag.svg";

import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface PropsHeader {
  language: string;
  setLanguage: (language: string) => void;
}

export function Header({ language, setLanguage }: PropsHeader) {
  const [languageText, setLanguageText] = useState("Language:");
  const [languageEnglish, setLanguageEnglish] = useState("English");
  const [languagePortuguese, setLanguagePortuguese] = useState("Portuguese");

  useEffect(() => {
    switch (language) {
      case "EN":
        setLanguageText("Language:");
        setLanguageEnglish("English");
        setLanguagePortuguese("Portuguese");
        break;
      case "PT-BR":
        setLanguageText("Idioma:");
        setLanguageEnglish("Inglês");
        setLanguagePortuguese("Português");
        break;
      default:
        setLanguageText("Language:");
        setLanguageEnglish("English");
        setLanguagePortuguese("English");
        break;
    }
  }, [language]);

  function handleLanguage(event: SelectChangeEvent) {
    setLanguage(event?.target.value);
    /* switch (language) {
      case "EN":
        setLanguage("PT-BR");
        break;
      case "PT-BR":
        setLanguage("EN");
        break;
      default:
        setLanguage("EN");
        break;
    } */
  }

  console.log(language);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img
            src={igniteLogo}
            alt="Ignite logo"
            className={styles.imageLogo}
          />
        </div>
        <div className={styles.language}>
          <FormControl size="small" className={styles.formSelect}>
            <InputLabel id="languageSelect" className={styles.inputLabel}>
              {languageText}
            </InputLabel>
            <Select
              labelId="languageSelect"
              id="languageSelect"
              value={language}
              label={languageText}
              onChange={handleLanguage}
            >
              <MenuItem value="EN">
                <img
                  src={americanFlag}
                  alt="American flag"
                  className={styles.imageFlag}
                />
                <span className={styles.menuItemText}>{languageEnglish}</span>
              </MenuItem>
              <MenuItem value="PT-BR">
                <img
                  src={brazilianFlag}
                  alt="Brazilian flag"
                  className={styles.imageFlag}
                />
                <span className={styles.menuItemText}>
                  {languagePortuguese}
                </span>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </header>
  );
}
