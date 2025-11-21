import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  form: FormGroup;
  sending = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.sending = true;
      const user = this.form.value as User;

      this.userService.create(user).subscribe(response => {
        this.sending = false;
        if (response.ok) {
          this.router.navigateByUrl('/usuarios');
        }
      }, () => {
        this.sending = false;
      });
    }
  }

  get name(): FormControl { return this.form.get('name') as FormControl; }
  get email(): FormControl { return this.form.get('email') as FormControl; }
  get password(): FormControl { return this.form.get('password') as FormControl; }

}
