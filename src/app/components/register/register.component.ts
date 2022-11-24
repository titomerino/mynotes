import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { Note } from 'src/app/interfaces/note-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register: FormGroup;
  dataRegister: Note = {
    id: 0,
    name: "",
    description: "",
    image: ""
  }

  @Input() note: Note = {
    id: 0,
    name: "",
    description: "",
    image: ""
  };

  @Output() action = new EventEmitter<any>();
  @Output() data = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.register = this.fb.group({
      name: [this.note.name, Validators.required],
      image: [this.note.image, Validators.required],
      description: [this.note.description, Validators.required]
    })
  }

  cancelRegister(value: any) {
    this.action.emit(value);
  }

  saveRegister() {
    if (this.register.valid) {
      this.dataRegister.id = this.note.id;
      this.dataRegister.name = this.register.get('name').value;
      this.dataRegister.image = this.register.get('image').value;
      this.dataRegister.description = this.register.get('description').value;
      this.data.emit(this.dataRegister);
    }
  }
}
