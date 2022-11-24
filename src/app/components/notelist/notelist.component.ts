import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.scss']
})
export class NotelistComponent implements OnInit {

  @Input() noteList = [];
  @Output() actionNoteItem = new EventEmitter<any>();


  /** Item note events */
  itemNoteAction = '';

  constructor() {

  }

  ngOnInit(): void {}

  noteAction(data: any) {
    this.actionNoteItem.emit(data);
  }
}
