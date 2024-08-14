import { Component, OnInit, NgModule } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as $ from 'jquery';
import { UserdetailsComponent } from '../userdetails/userdetails.component';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: User[];


  constructor(
    private userService: UserService,
    public dialog: MatDialog) {

  }

  ngOnInit() {
    console.log('UsersComponent.ngOnInit called');
    this.userService.getUsers().subscribe(u => this.users = u);
  }

  showContact(event: any): void {
    console.log(event);
    let id = event.target.id.substr("showContact_".length);
    let u = this.findUser(id);
    $('#' + event.target.id).replaceWith(u.emailAddress);
  }
/* 
The vulnerability here is this jquery line "$('#' + event.target.id).replaceWith(u.emailAddress);"
will diretly replace the user provide email into the DOM without Sanatizing it. This can lead to a 
stored XSS attack if the emailAddress field is not properly sanitized, and an attacker manages 
to insert malicious script content.

CWE:
CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting').

*/



  private findUser(id: any): User {
    return this.users.find(u => u.id == id);
  }

  showProfile(event: any): void {
    let id = event.target.id.substr("showContact_".length);
    let u =  this.findUser(id);
    const dialogRef = this.dialog.open(UserdetailsComponent, {
      //width: '250px',
      data: { user: u }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
}
