import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/models/Note';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss']
})
export class NoteItemComponent implements OnInit {

  @Input() noteItem! : Note

  @Output() onDelete = new EventEmitter();

  @Output() setOnEdit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deleteNote():void {
    this.onDelete.emit(
      this.noteItem.id
    )
  } 

  editNote():void {
    this.setOnEdit.emit(
      {
        text : this.noteItem.text,
        color : this.noteItem.color,
        id : this.noteItem.id
      }
    )
  }
}
