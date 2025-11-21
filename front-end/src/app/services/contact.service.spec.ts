import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactService } from './contact.service';
import { environment } from '../../environments/environment';
import { Contact } from '../models/contact';
import { ReturnMessage } from '../models/return-message';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl + 'contact';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService]
    });
    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a list of contacts', () => {
    const mockContacts: Contact[] = [
      { contactId: 1, name: 'user', email: 'user@gmail.com', phones: [{ phone: '123456789' }] },
      { contactId: 2, name: 'user2 ', email: 'user2@gmail.com', phones: [{ phone: '987654321' }] }
    ];
    const mockResponse: ReturnMessage<any[]> = { ok: true, data: mockContacts };

    service.list().subscribe(response => {
      expect(response.data?.length).toBe(2);
      expect(response.data).toEqual(mockContacts);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should retrieve a single contact by ID', () => {
    const mockContact: Contact = { contactId: 1, name: 'user', email: 'user@gmail.com', phones: [{ phone: '123456789' }] };
    const mockResponse: ReturnMessage<any> = { ok: true, data: mockContact };

    service.get(1).subscribe(response => {
      expect(response.data).toEqual(mockContact);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create a new contact', () => {
    const newContact: Contact = { name: 'user', email: 'user@gmail.com', phones: [{ phone: '123456789' }] };
    const mockResponse: ReturnMessage<Contact> = { ok: true, data: { ...newContact, contactId: 1 } };

    service.create(newContact).subscribe(response => {
      expect(response.ok).toBeTrue();
      expect(response.data?.contactId).toBe(1);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newContact);
    req.flush(mockResponse);
  });

  it('should update an existing contact', () => {
    const updatedContact: Contact = { contactId: 1, name: 'user  Updated', email: 'user@gmail.com', phones: [{ phone: '123456789' }] };
    const mockResponse: ReturnMessage<Contact> = { ok: true, data: updatedContact };

    service.update(1, updatedContact).subscribe(response => {
      expect(response.ok).toBeTrue();
      expect(response.data?.name).toBe('user  Updated');
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedContact);
    req.flush(mockResponse);
  });

  it('should search for contacts', () => {
    const term = 'user';
    const mockContacts: Contact[] = [
      { contactId: 1, name: 'user', email: 'user@gmail.com', phones: [{ phone: '123456789' }] }
    ];
    const mockResponse: ReturnMessage<Contact[]> = { ok: true, data: mockContacts };

    service.search(term).subscribe(response => {
      expect(response.data?.length).toBe(1);
      expect(response.data?.[0].name).toBe('user');
    });

    const req = httpMock.expectOne(`${apiUrl}/search`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ query: term });
    req.flush(mockResponse);
  });
});
