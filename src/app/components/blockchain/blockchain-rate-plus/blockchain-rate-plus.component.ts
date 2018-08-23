import { Component, OnInit } from '@angular/core';
import { Rate } from '../../../core/models/rate.model';
import { blockchainExplorer } from '../../../core/blockchain api/contract-service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blockchain-rate-plus',
  templateUrl: './blockchain-rate-plus.component.html',
  styleUrls: ['./blockchain-rate-plus.component.css']
})
export class BlockchainRatePlusComponent implements OnInit {
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
    this.explorer.ratePlus(this.bindingModel)
      .then(() => {
        this.toastr.success('Новината e оценена.', 'Готово')
        this.router.navigate(['/news/all'])
      })
      .catch(err => this.toastr.error(err, 'Грешка!'))

  }
}
