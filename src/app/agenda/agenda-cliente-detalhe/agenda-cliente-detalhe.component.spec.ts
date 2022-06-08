import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaClienteDetalheComponent } from './agenda-cliente-detalhe.component';

describe('AgendaClienteDetalheComponent', () => {
  let component: AgendaClienteDetalheComponent;
  let fixture: ComponentFixture<AgendaClienteDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaClienteDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaClienteDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
