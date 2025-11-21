import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] | undefined = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {

    this.contactService.list().subscribe(
      response => {
        this.contacts = response.data;
        console.log(JSON.stringify(this.contacts, null, 2));
      }
    );
  }

}
