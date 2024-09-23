import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedEventsComponent } from './searched-events.component';

describe('SearchedEventsComponent', () => {
  let component: SearchedEventsComponent;
  let fixture: ComponentFixture<SearchedEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchedEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
