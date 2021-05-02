const STORAGE_KEY = "mapp-theme";

export enum Themes {
  DARK = "dark-mode",
  LIGHT = "light-mode",
}

type Theme = Themes;

function getFromStorage():Theme {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if(stored === Themes.DARK){
    return Themes.DARK;
  }
  return Themes.LIGHT;
}


class ThemeManager {
  private static _instance: ThemeManager;
  currentTheme: Theme;

  private constructor() {
    this.currentTheme = getFromStorage();
  }

  public static get Instance(): ThemeManager {
    if (!ThemeManager._instance) {
      ThemeManager._instance = new ThemeManager();
    }
    return ThemeManager._instance;
  }

  public toggleTheme() {
    let nextTheme:Theme = this.currentTheme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
    this.currentTheme = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    const elem = document.getElementById("toggle");
    if(elem){
      elem.classList.toggle(Themes.LIGHT);
      elem.classList.toggle(Themes.DARK);
    }
  }
  public get Theme(): Theme {
    return this.currentTheme;
  }
}

export default ThemeManager;
