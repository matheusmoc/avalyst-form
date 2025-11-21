import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ReturnMessage } from 'src/app/models/return-message';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  const mockUsers: User[] = [
    { userId: 1, name: 'Admin', email: 'admin@gmail.com' },
    { userId: 2, name: 'User', email: 'user@gmail.com' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ UserService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    
    spyOn(userService, 'list').and.returnValue(of({ ok: true, data: mockUsers } as ReturnMessage<User[]>));
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(userService.list).toHaveBeenCalled();
    expect(component.users.length).toBe(2);
    expect(component.users).toEqual(mockUsers);
  });
});
