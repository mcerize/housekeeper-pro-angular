import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPesquisaComponent } from './usuario-pesquisa.component';

describe('UsuarioPesquisaComponent', () => {
  let component: UsuarioPesquisaComponent;
  let fixture: ComponentFixture<UsuarioPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioPesquisaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
