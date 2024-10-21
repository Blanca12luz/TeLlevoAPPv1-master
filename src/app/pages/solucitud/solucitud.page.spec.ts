import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolucitudPage } from './solucitud.page';

describe('SolucitudPage', () => {
  let component: SolucitudPage;
  let fixture: ComponentFixture<SolucitudPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolucitudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
