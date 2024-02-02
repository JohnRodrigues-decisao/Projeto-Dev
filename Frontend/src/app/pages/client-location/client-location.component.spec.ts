import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLocationComponent } from './client-location.component';

describe('ClientLocationComponent', () => {
  let component: ClientLocationComponent;
  let fixture: ComponentFixture<ClientLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientLocationComponent]
    });
    fixture = TestBed.createComponent(ClientLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
