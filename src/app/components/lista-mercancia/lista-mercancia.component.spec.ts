import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMercanciaComponent } from './lista-mercancia.component';

describe('ListaMercanciaComponent', () => {
  let component: ListaMercanciaComponent;
  let fixture: ComponentFixture<ListaMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMercanciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
