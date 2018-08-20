import { Injectable } from '@angular/core';
import * as ethers from '../../../../node_modules/ethers'
import { HttpClient } from '@angular/common/http'
import { contractInfo } from './contractInfo'
import { blockchainNews } from '../models/blockchain-create.model';
import { blockchainList } from '../models/blockchain-list.model';

let window: any;

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
        console.log(utf8)

        let hashed = ethers.utils.sha256(utf8)
        console.log(hashed)

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

    async showNewsFromCategory(categoryName) {
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
            console.log(categoriesCount)
            return categories
        }

        catch (err) {
            console.log(err)
        }
    }

    async ratePlus(category, index, voter) {
        let wallet = "0x0c9276e4899bf32557fd96ab06a6f85042fac2d0"
        try {
            await this.newsContract.plusRating(category, index, wallet)
        }
        catch (err) {
            console.log(err)
        }
    }

    async rateMinus(category, index, voter) {
        let wallet = "0x0c9276e4899bF32557fd96AB06a6F85042faC2d0"
        try {
            await this.newsContract.minusRating(category, index, wallet)
        }

        catch (err) {
            console.log(err)
        }
    }

}



