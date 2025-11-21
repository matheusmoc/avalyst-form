import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { ReturnMessage } from '../models/return-message';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl + 'user';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a list of users', () => {
    const mockUsers: User[] = [
      { userId: 1, name: 'Admin', email: 'admin@gmail.com' },
      { userId: 2, name: 'User', email: 'user@gmail.com' }
    ];
    const mockResponse: ReturnMessage<User[]> = { ok: true, data: mockUsers };

    service.list().subscribe(response => {
      expect(response.data?.length).toBe(2);
      expect(response.data).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create a new user', () => {
    const newUser: User = { name: 'New User', email: 'new@gmail.com', password: 'password123' };
    const mockResponse: ReturnMessage<User> = { ok: true, data: { ...newUser, userId: 1 } };

    service.create(newUser).subscribe(response => {
      expect(response.ok).toBeTrue();
      expect(response.data?.userId).toBe(1);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(mockResponse);
  });
});
