import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardEditorComponent } from './flashcard-editor.component';

describe('FlashcardEditorComponent', () => {
  let component: FlashcardEditorComponent;
  let fixture: ComponentFixture<FlashcardEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
