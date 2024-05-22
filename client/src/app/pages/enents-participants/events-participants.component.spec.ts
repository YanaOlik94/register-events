import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnentsParticipantsComponent } from './events-participants.component';

describe('EnentsParticipantsComponent', () => {
  let component: EnentsParticipantsComponent;
  let fixture: ComponentFixture<EnentsParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnentsParticipantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnentsParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
