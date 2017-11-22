import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguredMainComponent } from './configured-main.component';

describe('ConfiguredMainComponent', () => {
  let component: ConfiguredMainComponent;
  let fixture: ComponentFixture<ConfiguredMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguredMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguredMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
