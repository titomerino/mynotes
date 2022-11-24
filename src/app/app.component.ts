import { ThisReceiver } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ɵɵinjectPipeChangeDetectorRef } from '@angular/core';
import { Note } from './interfaces/note-interface';
import { ServerService } from './services/api/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mynotes';
  noteList: any = [];
  noteListCopy: any = [];

  /** footer events */
  newNote = '';

  /** Item note events */
  itemNoteAction = '';

  /** Register controls */
  showRegister = false;
  editItem: Note = {
    id: 0,
    name: "",
    image: "",
    description: ""
  }

  /** Notification control */
  notification = false;
  notificationMessage = "";
  notificationType = "";

  constructor (private notes: ServerService) {
    this.refreshNoteList();
  }

  refreshNoteList() {
    this.notes.getNoteList().subscribe(data => {
      this.noteList = data;
      this.noteListCopy = data;
    })
  }

  addNewNote(value: string) {
    if (value == 'new') {
      this.editItem = {
        id: 0,
        name: "",
        image: "",
        description: ""
      };
      this.showRegister = true;
    } else {
      this.showRegister = false;
    }
  }

  getNoteRegister(data: any) {
    if (data.id == 0) {
      this.saveNote(data);
    } else {
      this.updateNote(data);
    }
  }

  saveNote(data: any) {
    this.notes.postMethod('api/notes', data).subscribe(response => {
      this.activateNotification(true, response.message, "-success");
      this.refreshNoteList();
      this.showRegister = false;
    }, error => {
      this.activateNotification(true, error.message, "-error");
    });
  }

  deleteNote(id: number) {
    this.notes.deleteMethod('api/notes/' + id).subscribe(response => {
      this.activateNotification(true, response.message, "-success");
      this.refreshNoteList();
    }, error => {
      this.activateNotification(true, error.message, "-error");
    })
  }

  updateNote(data: any) {
    this.notes.putMethod('api/notes', data).subscribe(response => {
      this.activateNotification(true, response.message, "-success");
      this.refreshNoteList();
      this.showRegister = false;
    }, error => {
      this.activateNotification(true, error.message, "-error");
    });
  }

  noteAction(data: any) {
    if (data.action == 'see') {
      this.editItem = data.data;
      this.showRegister = true;
    } else {
      this.deleteNote(data.data.id);
    }
  }

  activateNotification(activate: boolean, message: string, type: string) {
    this.notification = activate;
    this.notificationMessage = message;
    this.notificationType = type;

    setTimeout(() => {
      this.notification = false;
    }, 3000);
  }

  searchWord(value: string) {
    let dataSearch = this.noteListCopy;
    if (value == '') {
      this.noteList = this.noteListCopy;
    } else {
      this.noteList = dataSearch.filter(item => item.name.toUpperCase().includes(value.toUpperCase( )))
    }
  }
}
