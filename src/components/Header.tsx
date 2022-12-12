// Material UI
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// Assets
import igniteLogo from "../assets/ignite-logo.svg";
import americanFlag from "../assets/americanflag.svg";
import brazilianFlag from "../assets/brazilianflag.svg";

// Styles
import styles from "./Header.module.css";

// Interfaces
import * as ILanguage from "../interfaces/ILanguage";

// Local interfaces
interface PropsHeader {
  language: string;
  setLanguage: (language: string) => void;
  currentLanguage: ILanguage.model;
}

export function Header({
  language,
  setLanguage,
  currentLanguage,
}: PropsHeader) {
  function handleLanguage(event: SelectChangeEvent) {
    setLanguage(event?.target.value);
  }

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
              {currentLanguage.header.languageText}
            </InputLabel>
            <Select
              labelId="languageSelect"
              id="languageSelect"
              className={styles.selectedItem}
              value={language}
              label={currentLanguage.header.languageText}
              onChange={handleLanguage}
            >
              <MenuItem value="EN" className={styles.menuItem}>
                <img
                  src={americanFlag}
                  alt="American flag"
                  className={styles.imageFlag}
                />
                <span className={styles.menuItemText}>
                  {currentLanguage.header.languageEnglish}
                </span>
              </MenuItem>
              <MenuItem value="PT-BR" className={styles.menuItem}>
                <img
                  src={brazilianFlag}
                  alt="Brazilian flag"
                  className={styles.imageFlag}
                />
                <span className={styles.menuItemText}>
                  {currentLanguage.header.languagePortuguese}
                </span>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </header>
  );
}
