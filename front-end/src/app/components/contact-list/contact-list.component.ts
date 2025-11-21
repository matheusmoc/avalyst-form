import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] | undefined = [];
  searchControl = new FormControl('');

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.contactService.search(term))
    ).subscribe(response => {
      this.contacts = response.data || [];
    });
  }

  formatPhone(phone: string): string {
    const raw = phone.replace(/\D/g, '');

    switch (raw.length) {
      case 11:
        return raw.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      case 10:
        return raw.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      default:
        return raw.length > 2
          ? raw.replace(/(\d{2})(\d{0,5})/, '($1) $2')
          : raw;
    }
  }

}
