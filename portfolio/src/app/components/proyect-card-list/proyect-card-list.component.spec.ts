import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectCardListComponent } from './proyect-card-list.component';

describe('ProyectCardListComponent', () => {
  let component: ProyectCardListComponent;
  let fixture: ComponentFixture<ProyectCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectCardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
