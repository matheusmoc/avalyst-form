import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserCreateComponent } from './user-create.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ReturnMessage } from 'src/app/models/return-message';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateComponent ],
      imports: [ 
        HttpClientTestingModule, 
        ReactiveFormsModule,
        RouterTestingModule 
      ],
      providers: [ UserService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty fields', () => {
    expect(component.form).toBeDefined();
    expect(component.name.value).toBe('');
    expect(component.email.value).toBe('');
    expect(component.password.value).toBe('');
  });

  it('should validate required fields', () => {
    component.onSubmit();
    expect(component.form.invalid).toBeTrue();
    expect(component.name.errors?.required).toBeTrue();
    expect(component.email.errors?.required).toBeTrue();
    expect(component.password.errors?.required).toBeTrue();
  });

  it('should validate email format', () => {
    component.email.setValue('invalid-email');
    expect(component.email.errors?.email).toBeTrue();
  });

  it('should validate password length', () => {
    component.password.setValue('12345');
    expect(component.password.errors?.minlength).toBeTruthy();
  });

  it('should submit valid form and navigate', () => {
    const mockUser: User = { name: 'New User', email: 'new@gmail.com', password: 'password123' };
    spyOn(userService, 'create').and.returnValue(of({ ok: true, data: mockUser } as ReturnMessage<User>));
    spyOn(router, 'navigateByUrl');

    component.form.patchValue(mockUser);

    component.onSubmit();

    expect(userService.create).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/usuarios');
  });

  it('should handle create error', () => {
    const mockUser: User = { name: 'New User', email: 'new@gmail.com', password: 'password123' };
    spyOn(userService, 'create').and.returnValue(throwError(() => new Error('Error')));
    spyOn(router, 'navigateByUrl');

    component.form.patchValue(mockUser);

    component.onSubmit();

    expect(userService.create).toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
    expect(component.sending).toBeFalse();
  });
});
