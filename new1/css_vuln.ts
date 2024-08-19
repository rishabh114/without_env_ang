
// src/app/user-profile.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserComponent {
    constructor(private http: HttpClient) {}
  
    fetchAndReplaceUserData(): void {
      // Simulate an API call that returns user data

      //source
      this.http.get<{ name: string, email: string }>('https://api.example.com/user/1').subscribe(user => {
        
        // Vulnerable: directly using the response to manipulate the DOM
        //sink
        document.getElementById('userInfo')!.innerHTML = `   
          <p>Name: ${user.name}</p>
          <p>Email: ${user.email}</p>
        `;
      });
    }
  }


/* 

This script directly inserts the potentially untrusted "user.name and user.email" values 
into the DOM without proper sanitization. If an attacker can inject malicious scripts into
the user.name or user.email, this can lead to XSS.

Source: The API response (user.name, user.email) is fetched.
Sink: These values are inserted directly into the DOM via innerHTML, making the application vulnerable to XSS.

*/
