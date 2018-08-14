import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';

declare let require: any;
declare let window: any;

let tokenAbi = require('../../../../truffle/build/contracts/News.json');

@Injectable({
  providedIn: 'root'
})
export class EthcontractService {
  private web3Provider: null
  private contracts: {}

  constructor() {
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    window.web3 = new Web3(this.web3Provider);
  }

  showNews(){
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(function(err, account) {
 
        if(err === null) {
          window.web3.eth.getBalance(account, function(err, balance) {
            if(err === null) {
              return resolve({fromAccount: account, balance: window.web3.fromWei(balance, "ether")});
            } else {
              return reject("error!");
            }
          });
        }
      });
    });
  }

}
