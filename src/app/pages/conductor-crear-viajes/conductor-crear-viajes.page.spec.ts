import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConductorCrearViajesPage } from './conductor-crear-viajes.page';

describe('ConductorCrearViajesPage', () => {
  let component: ConductorCrearViajesPage;
  let fixture: ComponentFixture<ConductorCrearViajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductorCrearViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
