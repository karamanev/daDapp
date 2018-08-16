import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { blockchainExplorer } from '../../../core/blockchain api/contractExplorer';
import { blockchainNews } from '../../../core/models/blockchainNews.model';

import { NewsList } from '../../../core/models/news-list.model';

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
     .then(res => console.log(res))
     .catch(err => console.log(err));

     console.log(this.news)
    }

}
