import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaClienteMarcacaoComponent } from './agenda-cliente-marcacao.component';

describe('AgendaClienteMarcacaoComponent', () => {
  let component: AgendaClienteMarcacaoComponent;
  let fixture: ComponentFixture<AgendaClienteMarcacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaClienteMarcacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaClienteMarcacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
