import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardHomescreenComponent } from './flashcard-homescreen.component';

describe('FlashcardHomescreenComponent', () => {
  let component: FlashcardHomescreenComponent;
  let fixture: ComponentFixture<FlashcardHomescreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardHomescreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardHomescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
