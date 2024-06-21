import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyModalComponent } from './key-modal.component';

describe('KeyModalComponent', () => {
  let component: KeyModalComponent;
  let fixture: ComponentFixture<KeyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeyModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
