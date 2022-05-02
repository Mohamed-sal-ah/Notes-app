import { Component } from '@angular/core';
import { nanoid } from 'nanoid';
import { Note } from './models/Note';
import { NotesService } from './services/notes.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  allNotes : Note[] = []
  
  notes : Note[] = []

  searchNotes : string = ''

  inputNote : string = ''

  inputColor : string = 'blue'

  editId : string | null = null

  colors : string[] = ['blue','green','yellow','red','purple']

  showInput : boolean = false

  toggleTheme : boolean = false;

  constructor(private noteService : NotesService,private themeService: ThemeService) { }
  
  ngOnInit(): void {
    document.body.classList.toggle('dark',this.themeService.getTheme())
    this.toggleTheme = this.themeService.getTheme()
    this.notes = this.noteService.getNotes()
    this.allNotes = this.notes
  }

  onThemeChange () : void {
    document.body.classList.toggle('dark',!this.toggleTheme)
    this.toggleTheme = !this.toggleTheme
    this.themeService.setTheme(this.toggleTheme)
  }

  onSearch (): void{
    this.notes = this.allNotes.filter(note => note.text.toLowerCase().includes(this.searchNotes.toLowerCase()))
  }

  onCancelSearch (): void {
    this.searchNotes = ''
    this.notes = this.allNotes
  }
  
  toggleInput():void {
    this.showInput = !this.showInput
    this.inputNote = ''
    this.inputColor = 'blue'
    this.notes = this.allNotes
    this.searchNotes = ''
  }

  onColorChange (color :string):void {
    this.inputColor = color
  }

  addNote ():void {
    this.allNotes.push({
      text : this.inputNote,
      date : new Date().toLocaleDateString(),
      color: this.inputColor,
      id : nanoid(10)
    })
    this.notes = this.allNotes
    this.noteService.setNotes(JSON.stringify(this.notes))
    this.inputNote = ''
    this.inputColor = 'blue'
    this.showInput = false
  }

  deleteNote (id : string):void {
    const deletedNote  : Note[] = this.allNotes.filter((note) => note.id !== id)
    this.searchNotes = ''
    this.notes = deletedNote
    this.allNotes = deletedNote
    this.noteService.setNotes(JSON.stringify(this.notes))
  }

  saveEditNote () :void {
    const updatedNotes : Note[] = this.notes.map((note) => {
      if (note.id === this.editId) {
        return {...note, text : this.inputNote,color : this.inputColor}
      }
      return note
    })
    this.editId = null
    this.notes = updatedNotes
    this.noteService.setNotes(JSON.stringify(updatedNotes))
    this.allNotes = updatedNotes
    this.inputNote = ''
    this.inputColor = 'blue'
    this.showInput = false;
  } 
  
  setEditNote ({text ,color ,id }: any) {
    this.inputNote = text
    this.inputColor = color
    this.editId = id
    this.showInput = true
    this.searchNotes = ''
    this.notes = this.allNotes
  }
  
  cancelEditNote () {
    this.inputNote = ''
    this.inputColor = 'blue'
    this.editId = null
    this.showInput = false
  }

}
