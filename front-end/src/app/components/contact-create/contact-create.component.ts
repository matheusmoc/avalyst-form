import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent implements OnInit {

  form: FormGroup;
  sending = false;

  constructor(
    private router: Router,
    private contactService: ContactService
  ) {

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phones: new FormArray([])
    });

  }

  ngOnInit(): void {
    this.addPhone();
  }


  addPhone(): void {
    this.phones.push(new FormControl('', Validators.required));
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  applyMask(index: number): void {
    const raw = (this.phones.at(index)?.value || '').replace(/\D/g, '');
    const masked =
      raw.length > 10 ? raw.replace(/(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3') :
      raw.length > 6 ? raw.replace(/(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3') :
      raw.length > 2 ? raw.replace(/(\d{2})(\d{0,5})/, '($1) $2') :
      raw.length > 0 ? raw.replace(/(\d{0,2})/, '($1') :
      '';
    this.phones.at(index)?.setValue(masked, { emitEvent: false });
  }


  onSubmit(): void {

    this.form.markAllAsTouched();

    if (this.form.valid) {

      const cleanedPhones = this.phones.controls.map(c => c.value.replace(/\D/g, ''));

      const contact: Contact = {
        ...this.form.value,
        phones: cleanedPhones
      };
      console.log(cleanedPhones);

      this.contactService.create(contact).subscribe(response => {

        if (response.ok) {
          this.router.navigateByUrl('/contatos');
        }

      });

    }

  }

  get name(): FormControl { return this.form.get('name') as FormControl; }
  get email(): FormControl { return this.form.get('email') as FormControl; }
  get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }
}
