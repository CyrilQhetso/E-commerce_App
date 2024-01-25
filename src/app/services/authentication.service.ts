import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  // Array to store registered users
  private users: { username: string; password: string }[] = [];
  // variable to track if user is authenticated
  private isUserAuthenticated: boolean = false;
  // store current logged in user
  private currentUser: { username: string; password: string } | null = null;
  
  // register a new user with unique username and password
  register(username: string, password: string): Observable<boolean> {
    // Check if the username is taken 
    const isUsernameTaken = this.users.some(user => user.username === username);
    
    if (isUsernameTaken) {
      
      return of(false); // username already exist

    } else {
      // register new user
      this.users.push({ username, password });
      return of(true); //Registration successful
    }
  }

  // Login a user with provided username and password
  login(username: string, password: string): Observable<boolean> {
    
    // Check if username and password match registered user
    const isUserValid = this.users.some(user => user.username === username && user.password === password);

    if (isUserValid) {
      
      // store cuurent user and set state to true
      this.isUserAuthenticated = true;
      this.currentUser = { username, password };
      return of(true);// Login successful

    } else {
      
      return of(false); // Invalid credentials login fail
    }
  }

  // Check if user is authenticated
  isAuthenticated() : boolean {
    
    return  this.isUserAuthenticated;

  }

  // Logout current user
  logout(): void {

    // resset current state such that user is logged out
    this.isUserAuthenticated = false;
    this.currentUser = null;

  }
  
}
