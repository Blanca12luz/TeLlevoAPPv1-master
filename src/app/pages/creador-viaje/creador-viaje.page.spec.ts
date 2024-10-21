import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreadorViajePage } from './creador-viaje.page';

describe('CreadorViajePage', () => {
  let component: CreadorViajePage;
  let fixture: ComponentFixture<CreadorViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreadorViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
