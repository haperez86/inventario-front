import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioMercanciaComponent } from './formulario-mercancia.component';

describe('FormularioMercanciaComponent', () => {
  let component: FormularioMercanciaComponent;
  let fixture: ComponentFixture<FormularioMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioMercanciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
