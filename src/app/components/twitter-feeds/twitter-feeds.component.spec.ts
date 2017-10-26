import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterFeedsComponent } from './twitter-feeds.component';

describe('TwitterFeedsComponent', () => {
  let component: TwitterFeedsComponent;
  let fixture: ComponentFixture<TwitterFeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterFeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
