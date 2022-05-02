import { Injectable } from '@angular/core';
import { Note } from '../models/Note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private getLocal : any = localStorage.getItem("notes")

  constructor() { }

  getNotes (): Note[] {
    return JSON.parse(this.getLocal) ? JSON.parse(this.getLocal) : []
  }

  setNotes (setLocal : string):void {
    localStorage.setItem("notes",setLocal)
  }
}
