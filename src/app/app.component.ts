import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  title = 'sampleWorkSense';
  admin!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.admin = this.fb.group({
  
      username: ['', Validators.required]
    });
  }

}


