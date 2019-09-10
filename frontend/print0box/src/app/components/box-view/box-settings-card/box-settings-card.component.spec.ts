import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxSettingsCardComponent } from './box-settings-card.component';

describe('BoxSettingsCardComponent', () => {
  let component: BoxSettingsCardComponent;
  let fixture: ComponentFixture<BoxSettingsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxSettingsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxSettingsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
