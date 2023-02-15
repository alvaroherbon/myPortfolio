import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendListComponent } from './frontend-list.component';

describe('FrontendListComponent', () => {
  let component: FrontendListComponent;
  let fixture: ComponentFixture<FrontendListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontendListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
