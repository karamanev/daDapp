import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { blockchainExplorer } from '../../../core/blockchain api/contract-service';
import { blockchainNews } from '../../../core/models/blockchain-create.model';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent implements OnInit {
  news : any

  constructor(
    private explorer : blockchainExplorer
  ) { }

  ngOnInit() {
     this.news = this.explorer.showNews()    
    }

}
