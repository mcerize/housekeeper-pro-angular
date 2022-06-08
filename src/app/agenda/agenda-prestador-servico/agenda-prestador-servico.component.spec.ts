import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaPrestadorServicoComponent } from './agenda-prestador-servico.component';

describe('AgendaPrestadorServicoComponent', () => {
  let component: AgendaPrestadorServicoComponent;
  let fixture: ComponentFixture<AgendaPrestadorServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaPrestadorServicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaPrestadorServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
