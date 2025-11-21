import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ContactListComponent } from './contact-list.component';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact';
import { ReturnMessage } from 'src/app/models/return-message';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let contactService: ContactService;

  const mockContacts: Contact[] = [
    { contactId: 1, name: 'user', email: 'user@gmail.com', phones: [{ phone: '123456789' }] },
    { contactId: 2, name: 'user2', email: 'user2@gmail.com', phones: [{ phone: '987654321' }] }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactListComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule ],
      providers: [ ContactService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(ContactService);
    
    spyOn(contactService, 'search').and.returnValue(of({ ok: true, data: mockContacts } as ReturnMessage<Contact[]>));
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should search contacts when search control changes', fakeAsync(() => {
    const searchResults: Contact[] = [
      { contactId: 1, name: 'user', email: 'user@gmail.com', phones: [{ phone: '123456789' }] }
    ];
    (contactService.search as jasmine.Spy).calls.reset();
    (contactService.search as jasmine.Spy).and.returnValue(of({ ok: true, data: searchResults } as ReturnMessage<Contact[]>));

    component.searchControl.setValue('user');
    
    tick(300);
    
    expect(contactService.search).toHaveBeenCalledWith('user');
    expect(component.contacts?.length).toBe(1);
    expect(component.contacts?.[0].name).toBe('user');
  }));

  it('should handle empty search result', fakeAsync(() => {
    (contactService.search as jasmine.Spy).calls.reset();
    (contactService.search as jasmine.Spy).and.returnValue(of({ ok: true, data: [] } as ReturnMessage<Contact[]>));

    component.searchControl.setValue('NonExistent');
    
    tick(300);
    
    expect(contactService.search).toHaveBeenCalledWith('NonExistent');
    expect(component.contacts?.length).toBe(0);
  }));
});
