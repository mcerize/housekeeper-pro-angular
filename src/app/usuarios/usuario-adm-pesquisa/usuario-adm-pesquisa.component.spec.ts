import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioAdmPesquisaComponent } from './usuario-adm-pesquisa.component';

describe('UsuarioAdmPesquisaComponent', () => {
  let component: UsuarioAdmPesquisaComponent;
  let fixture: ComponentFixture<UsuarioAdmPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioAdmPesquisaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioAdmPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
