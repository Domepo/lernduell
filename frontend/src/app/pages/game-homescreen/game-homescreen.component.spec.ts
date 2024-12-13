import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameHomescreenComponent } from './game-homescreen.component';

describe('GameHomescreenComponent', () => {
  let component: GameHomescreenComponent;
  let fixture: ComponentFixture<GameHomescreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameHomescreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameHomescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
