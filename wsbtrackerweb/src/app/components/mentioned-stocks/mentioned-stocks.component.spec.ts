import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionedStocksComponent } from './mentioned-stocks.component';

describe('MentionedStocksComponent', () => {
  let component: MentionedStocksComponent;
  let fixture: ComponentFixture<MentionedStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentionedStocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentionedStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
