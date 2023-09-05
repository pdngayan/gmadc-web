import { Component, ViewChild, ElementRef } from '@angular/core';
import { MailService } from './mail.service';

// import * as _swal from 'sweetalert';
// import swal, { SweetAlert } from 'sweetalert/typings/core';

// import {SweetAlert} from 'sweetalert/typings/core';

import swal from 'sweetalert';

// import * as Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'dmndc';
  @ViewChild('navmenu', { static: true }) navmenu: ElementRef;
  name: string = "";
  message: string = "";
  email: string = "";

 

  constructor(private mailService: MailService) {
  }



  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
    // this.navmenu.nativeElement.style.display = 'none';
  }

  expandMenu(el: HTMLElement) {
    if (el.getAttribute("aria-expanded") == "true") {
      el.style.display = 'none';
      el.setAttribute("aria-expanded", "false");
    } else {
      el.style.display = 'block';
      el.setAttribute("aria-expanded", "true");
    }
  }

  sendEmail() {
    let mailData: any = {
      name: this.name,
      message: this.message,
      email: this.email
    };
    if (this.name != "" && this.email != "") {
      if (this.email.includes("@")) {
        this.mailService.send(mailData).subscribe(
          res => {
            console.log(res);
            this.name = "";
            this.message = "";
            this.email = "";
            swal({
              title: "Success",
              text: "Your message sent successfully !",
              icon: "success",
            });
          }, error => {
            console.log(error);
          }
        );
      } else {
        swal({
          title: "Validation",
          text: "Please enter valid email address !",
          icon: "error",
        });
      }

    } else {
      console.log("Empty");
      swal({
        title: "Validation",
        text: "Please enter required fields !",
        icon: "error",
      });
    }

  }




}
