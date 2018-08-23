import { Injectable } from '@angular/core';
import * as ethers from 'ethers'
import * as web3 from 'web3'

import { contractInfo } from './contractInfo'
import { blockchainNews } from '../models/blockchain-create.model';
import { blockchainList } from '../models/blockchain-list.model';
import { Rate } from '../models/rate.model'

@Injectable({
    providedIn: 'root'
})

export class blockchainExplorer {
    provider: string
    contractAddress: string
    contractABI: any
    newsContract: any
    blockchainNews: blockchainNews
    blockchainList: blockchainList

    constructor() {
        this.provider = ethers.providers.getDefaultProvider('ropsten')
        this.contractAddress = contractInfo.prototype.getContractAddress()
        this.contractABI = contractInfo.prototype.getContractABI()
        this.newsContract = new ethers.Contract(this.contractAddress, this.contractABI, this.provider)
    }

    async showNews() {
        try {
            let news = []
            let categoriesCount = Number(await this.newsContract.getNumberOfCategories())
            for (let index = 0; index < categoriesCount; index++) {
                let currentCategoryName = "";
                currentCategoryName = await this.newsContract.getCategoryName(index)
                let newsInCurrentCategory = Number(await this.newsContract.getNumberOfNewsInType(currentCategoryName))

                for (let newsIndex = 0; newsIndex < newsInCurrentCategory; newsIndex++) {
                    let result = new blockchainList("", "", "", 0)
                    result = await this.newsContract.getNews(currentCategoryName, newsIndex)
                    result.category = currentCategoryName
                    news.push(result)
                }
            }
            return news
        }

        catch (err) {
            console.log(err)
        }
    }

    async addCurrentNews(body: blockchainNews) {
        let privateKey = '0xf91c7e6f1e5a32ee9c8cfbd0b050f39e249d4effd19942537c04d34b78821b75'
        let stringToHash = '' + body.title + body.summary + body.category + body.publisher
        let utf8 = ethers.utils.toUtf8Bytes(stringToHash)
        let hashed = ethers.utils.sha256(utf8)

        try {
            let wallet = await new ethers.Wallet(privateKey, this.provider);
            let newsContract = await new ethers.Contract(this.contractAddress, this.contractABI, wallet)
            await newsContract.addNews(body.title, body.category, hashed)
            return
        }
        catch (err) {
            console.log(err)
        }
    }

    async showNewsFromCategory(categoryName: string) {
        try {
            let news = []
            let newsInCategoryCount = Number(await this.newsContract.getNumberOfNewsInType(categoryName))
            for (let index = 0; index < newsInCategoryCount; index++) {
                let result = new blockchainList("", "", "", 0)
                result = await this.newsContract.getNews(categoryName, index)
                result.category = categoryName
                news.push(result)
            }
            return news
        }

        catch (err) {
            console.log(err)
        }
    }

    async showCategories() {
        try {
            let categories = []
            let categoriesCount = Number(await this.newsContract.getNumberOfCategories())
            for (let index = 0; index < categoriesCount; index++) {
                let currentCategoryName = "";
                currentCategoryName = await this.newsContract.getCategoryName(index)
                categories.push(currentCategoryName)
            }
            return categories
        }

        catch (err) {
            console.log(err)
        }
    }

    async ratePlus(body: Rate) {
        try {
            let category: string
            let rateIndex: string
            let privateKey = '0x' + body.wallet

            let wallet = await new ethers.Wallet(privateKey, this.provider);
            let newsContract = await new ethers.Contract(this.contractAddress, this.contractABI, wallet)
            let title = body.title

            let categoriesCount = Number(await newsContract.getNumberOfCategories())
            for (let index = 0; index < categoriesCount; index++) {
                let currentCategoryName: string = await newsContract.getCategoryName(index)
                let newsInCurrentCategory = Number(await newsContract.getNumberOfNewsInType(currentCategoryName))
                for (let newsIndex = 0; newsIndex < newsInCurrentCategory; newsIndex++) {
                    let result: blockchainList = await newsContract.getNews(currentCategoryName, newsIndex)

                    if (result.title === title) {
                        category = currentCategoryName
                        rateIndex = newsIndex.toString()

                        
                        if (typeof web3 !== 'undefined') {
                            var web3Provider = new web3.providers.HttpProvider("http://127.0.0.1:8545");
                            web3Provider.getBalance("0x0c9276e4899bF32557fd96AB06a6F85042faC2d0"). then(function(balance) {
                              var etherString = ethers.utils.formatEther(balance);
                              console.log("Balance: " + etherString);
                            });
                          }
                        
                        console.log(`${category}, ${rateIndex}, \"${wallet.address}\"`)

                        return await this.newsContract.plusRating(category, rateIndex, wallet.address)
                    }
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    async rateMinus(category: string, index: string, voter: string) {
        try {
            await this.newsContract.minusRating(category, index, voter)
        }

        catch (err) {
            console.log(err)
        }
    }

    async checkNews(news: blockchainNews) {
        try {
            let stringToHash = '' + news.title + news.summary + news.category + news.publisher
            let utf8 = ethers.utils.toUtf8Bytes(stringToHash)
            let hashed = ethers.utils.sha256(utf8)

            let categoriesCount = Number(await this.newsContract.getNumberOfCategories())
            for (let index = 0; index < categoriesCount; index++) {
                let currentCategoryName: string = await this.newsContract.getCategoryName(index)
                let newsInCurrentCategory = Number(await this.newsContract.getNumberOfNewsInType(currentCategoryName))
                for (let newsIndex = 0; newsIndex < newsInCurrentCategory; newsIndex++) {
                    let result: blockchainList = await this.newsContract.getNews(currentCategoryName, newsIndex)

                    if (result.hashed === hashed) {
                        return true
                    }
                }
            }
            return false
        }

        catch (err) {
            console.log(err)
        }
    }

}