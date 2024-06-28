import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPoblacionComponent } from './editar-poblacion.component';

describe('EditarPoblacionComponent', () => {
  let component: EditarPoblacionComponent;
  let fixture: ComponentFixture<EditarPoblacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPoblacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPoblacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
