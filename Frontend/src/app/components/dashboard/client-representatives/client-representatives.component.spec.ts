import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRepresentativesComponent } from './client-representatives.component';

describe('ClientRepresentativesComponent', () => {
  let component: ClientRepresentativesComponent;
  let fixture: ComponentFixture<ClientRepresentativesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientRepresentativesComponent]
    });
    fixture = TestBed.createComponent(ClientRepresentativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
