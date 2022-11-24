import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from 'src/app/interfaces/note-interface';

@Component({
  selector: 'app-noteitem',
  templateUrl: './noteitem.component.html',
  styleUrls: ['./noteitem.component.scss']
})
export class NoteitemComponent implements OnInit {

  active = "";

  @Input() item: Note = {
    id: 0,
    name: "",
    description: "",
    image: ""
  };

  @Output() action = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onActive() {
    if (this.active == "") {
      this.active = "-active";
    } else {
      this.active = "";
    }
  }

  actionNote(action: string) {
    this.action.emit({action: action, data: this.item});
  }
}
