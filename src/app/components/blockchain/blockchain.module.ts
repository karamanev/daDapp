import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { BlockchainRoutingModule } from './blockchain-routing.module'
import { PipesModule } from '../../core/pipes/pipes.module';

import { BlockchainComponent } from './all-blockchain/blockchain.component';
import { BlockchainRatePlusComponent } from './blockchain-rate-plus/blockchain-rate-plus.component';
import { BlockchainRateMinusComponent } from './blockchain-rate-minus/blockchain-rate-minus.component';


@NgModule({
    declarations: [
        BlockchainComponent,
        BlockchainRatePlusComponent,
        BlockchainRateMinusComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        BlockchainRoutingModule,
        PipesModule.forRoot(),
    ]
})
export class BlockchainModule { }