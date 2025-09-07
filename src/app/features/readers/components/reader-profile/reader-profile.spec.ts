import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderProfile } from './reader-profile';

describe('ReaderProfile', () => {
  let component: ReaderProfile;
  let fixture: ComponentFixture<ReaderProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReaderProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReaderProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
