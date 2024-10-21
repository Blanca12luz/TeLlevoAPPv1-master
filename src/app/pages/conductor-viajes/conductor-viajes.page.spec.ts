import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConductorViajesPage } from './conductor-viajes.page';

describe('ConductorViajesPage', () => {
  let component: ConductorViajesPage;
  let fixture: ComponentFixture<ConductorViajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductorViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
