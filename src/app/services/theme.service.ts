import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor() { }

  private getLocalTheme : any = localStorage.getItem("theme")

  getTheme (): boolean {
    let systemTheme : boolean = false
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      systemTheme = true
    }
    return JSON.parse(this.getLocalTheme) ? JSON.parse(this.getLocalTheme) : systemTheme
  }  

  setTheme (theme : boolean) {
    if (theme === true) {
      localStorage.setItem("theme",JSON.stringify(theme))
    } else {
      localStorage.setItem("theme",JSON.stringify(theme))
    }
  }
}
