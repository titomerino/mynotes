import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Output() newNote = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  addNewNote(value: string) {
    this.newNote.emit(value);
  }
}
