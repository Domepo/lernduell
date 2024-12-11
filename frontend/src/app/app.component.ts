import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgbAccordionModule],
  template: `
    <div ngbAccordion>
      <div ngbAccordionItem>
        <h2 ngbAccordionHeader>
          <button ngbAccordionButton>Simple</button>
        </h2>
        <div ngbAccordionCollapse>
          <div ngbAccordionBody>
            Accordion Body Content
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent {}
