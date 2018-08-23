import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockchainRateMinusComponent } from './blockchain-rate-minus.component';

describe('BlockchainRateMinusComponent', () => {
  let component: BlockchainRateMinusComponent;
  let fixture: ComponentFixture<BlockchainRateMinusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockchainRateMinusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockchainRateMinusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
