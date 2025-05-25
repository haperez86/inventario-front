import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroBusquedaComponent } from './filtro-busqueda.component';

describe('FiltroBusquedaComponent', () => {
  let component: FiltroBusquedaComponent;
  let fixture: ComponentFixture<FiltroBusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroBusquedaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
