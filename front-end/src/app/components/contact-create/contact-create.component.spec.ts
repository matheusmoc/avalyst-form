import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ContactCreateComponent } from './contact-create.component';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact';
import { ReturnMessage } from 'src/app/models/return-message';

describe('ContactCreateComponent', () => {
  let component: ContactCreateComponent;
  let fixture: ComponentFixture<ContactCreateComponent>;
  let contactService: ContactService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactCreateComponent ],
      imports: [ 
        HttpClientTestingModule, 
        ReactiveFormsModule,
        RouterTestingModule 
      ],
      providers: [ ContactService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCreateComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(ContactService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with one phone field', () => {
    expect(component.form).toBeDefined();
    expect(component.phones.length).toBe(1);
  });

  it('should add a phone field', () => {
    component.addPhone();
    expect(component.phones.length).toBe(2);
  });

  it('should remove a phone field', () => {
    component.addPhone();
    component.removePhone(1);
    expect(component.phones.length).toBe(1);
  });

  it('should not submit invalid form', () => {
    spyOn(contactService, 'create');
    component.onSubmit();
    expect(contactService.create).not.toHaveBeenCalled();
    expect(component.form.invalid).toBeTrue();
  });

  it('should submit valid form and navigate', () => {
    const mockContact: Contact = { name: 'user', email: 'user@gmail.com', phones: [{ phone: '123456789' }] };
    spyOn(contactService, 'create').and.returnValue(of({ ok: true, data: mockContact } as ReturnMessage<Contact>));
    spyOn(router, 'navigateByUrl');

    component.form.patchValue({
      name: 'user',
      email: 'user@gmail.com'
    });
    component.phones.at(0).setValue('123456789');

    component.onSubmit();

    expect(contactService.create).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/contatos');
  });
});
