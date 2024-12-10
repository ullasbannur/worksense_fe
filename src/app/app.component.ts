import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

 enum ToasterPosition {
  TOP_LEFT = 'toaster-top-left',
  TOP_CENTER = 'toaster-top-center',
  TOP_RIGHT = 'toaster-top-right',
  BOTTOM_LEFT = 'toaster-bottom-left',
  BOTTOM_CENTER = 'toaster-bottom-center',
  BOTTOM_RIGHT = 'toaster-bottom-right'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  title = 'sampleWorkSense';
  toasterPosition = ToasterPosition;
  constructor(private fb: FormBuilder) {
  }
}