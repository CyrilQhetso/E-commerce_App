import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  @ViewChild('container')
  container!: ElementRef;
 
  user = {
    username: '',
    email: '',
    password: ''
  };
 
  signIn() {
    this.container.nativeElement.classList.remove('right-panel-active');
  }
 
  signUp() {
    this.container.nativeElement.classList.add('right-panel-active');
  }
 
  onSubmit() {
    alert(`User registered:\nUsername: ${this.user.username}\nEmail: ${this.user.email}`);
  }
}
