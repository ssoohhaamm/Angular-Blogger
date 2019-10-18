import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredComponent } from './filtered.component';

describe('FilteredComponent', () => {
  let component: FilteredComponent;
  let fixture: ComponentFixture<FilteredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
