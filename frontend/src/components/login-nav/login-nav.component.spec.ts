import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNavComponent } from './login-nav.component';

describe('LoginNavComponent', () => {
  let component: LoginNavComponent;
  let fixture: ComponentFixture<LoginNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
