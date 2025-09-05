import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvicesList } from './advices-list';

describe('AdvicesList', () => {
  let component: AdvicesList;
  let fixture: ComponentFixture<AdvicesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvicesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvicesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
