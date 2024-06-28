import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionMotivoComponent } from './edicion-motivo.component';

describe('EdicionMotivoComponent', () => {
  let component: EdicionMotivoComponent;
  let fixture: ComponentFixture<EdicionMotivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicionMotivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdicionMotivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
