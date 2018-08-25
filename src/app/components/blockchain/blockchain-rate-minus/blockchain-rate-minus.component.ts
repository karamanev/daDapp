import { Component, OnInit } from '@angular/core';
import { Rate } from '../../../core/models/rate.model';
import { blockchainExplorer } from '../../../core/blockchain api/contract-service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blockchain-rate-minus',
  templateUrl: './blockchain-rate-minus.component.html',
  styleUrls: ['./blockchain-rate-minus.component.css']
})
export class BlockchainRateMinusComponent implements OnInit {
  bindingModel: Rate;
  title: string

  constructor(private explorer: blockchainExplorer,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute, ) {

    this.title = this.route.snapshot.params['title'];
    this.bindingModel = new Rate(this.title, "")
  }


  ngOnInit() {
  }

  async rate() {
    this.explorer.rateMinus(this.bindingModel)
      .then(() => {
        this.router.navigate(['/news/all'])
      })
      .catch(err => this.toastr.error(err, 'Грешка!'))

  }
}
