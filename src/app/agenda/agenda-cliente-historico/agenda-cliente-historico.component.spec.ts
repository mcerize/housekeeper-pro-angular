import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaClienteHistoricoComponent } from './agenda-cliente-historico.component';

describe('AgendaClienteHistoricoComponent', () => {
  let component: AgendaClienteHistoricoComponent;
  let fixture: ComponentFixture<AgendaClienteHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaClienteHistoricoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaClienteHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
