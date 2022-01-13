import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChesscomProfileComponent } from './chesscom-profile.component';

describe('ChesscomProfileComponent', () => {
  let component: ChesscomProfileComponent;
  let fixture: ComponentFixture<ChesscomProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChesscomProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChesscomProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
