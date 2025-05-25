import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioSelectorComponent } from './usuario-selector.component';

describe('UsuarioSelectorComponent', () => {
  let component: UsuarioSelectorComponent;
  let fixture: ComponentFixture<UsuarioSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
