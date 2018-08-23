import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BlockchainComponent } from './all-blockchain/blockchain.component';

import { AuthGuard } from '../../core/guards/auth.guard';
import { BlockchainRateMinusComponent } from './blockchain-rate-minus/blockchain-rate-minus.component';
import { BlockchainRatePlusComponent } from './blockchain-rate-plus/blockchain-rate-plus.component';

const routes : Route[] = [
    { path: 'all', component: BlockchainComponent },
    { path: 'rateplus/:title', component: BlockchainRatePlusComponent, canActivate: [ AuthGuard ] },
    { path: 'rateminus/:title', component: BlockchainRateMinusComponent, canActivate: [ AuthGuard ] },
  ]
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
  })
  export class BlockchainRoutingModule {}