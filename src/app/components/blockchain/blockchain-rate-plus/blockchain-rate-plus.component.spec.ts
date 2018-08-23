import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockchainRatePlusComponent } from './blockchain-rate-plus.component';

describe('BlockchainRatePlusComponent', () => {
  let component: BlockchainRatePlusComponent;
  let fixture: ComponentFixture<BlockchainRatePlusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockchainRatePlusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockchainRatePlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
