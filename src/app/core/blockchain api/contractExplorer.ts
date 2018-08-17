import { Injectable } from '@angular/core';
import * as ethers from '../../../../node_modules/ethers'
import { HttpClient } from '@angular/common/http'
import {contractInfo} from './contractInfo'

let window: any;

@Injectable({
    providedIn: 'root'
})

export class blockchainExplorer {
    provider: null
    contractAddress: string
    contractABI: any
    newsContract: any

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
                    let result = {
                        title: String,
                        category: String,
                        hashed: String,
                        rating: Number
                    }
                        result = await this.newsContract.getNews(currentCategoryName, newsIndex)
                    let currentNews = {
                        title: result.title,
                        category: currentCategoryName,
                        hashed: result.hashed,
                        rating: Number(result.rating)
                    }
                    news.push(currentNews)
                }
            }
            return news
        }
    
        catch (err) {
            console.log(err)
        }
    
    }
    
    async addCurrentNews(title, category, hashed) {
        let privateKey = '0xf91c7e6f1e5a32ee9c8cfbd0b050f39e249d4effd19942537c04d34b78821b75'
        try {
            let wallet = await new ethers.Wallet(privateKey, this.provider);
            let newsContract = await new ethers.Contract(this.contractAddress, this.contractABI, wallet)
            await newsContract.addNews(title, category, hashed)
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
                let result = {
                    title: String,
                    category: String,
                    hashed: String,
                    rating: Number
                }
                result = await this.newsContract.getNews(categoryName, index)
                let currentNews = {
                    title: result.title,
                    category: categoryName,
                    hashed: result.hashed,
                    rating: Number(result.rating)
                }
                news.push(currentNews)
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











/*




    async showNews() {
        return new Promise((resolve, reject) => {
            let result = {
                title: '',
                summary: '',
                category: '',
                publisher: '',
                rating: 0
            }
            let news = []

            let contract = 
            
            let categoriesCount = contract.getNumberOfCategories()
            console.log(categoriesCount)
            for (let index = 0; index < categoriesCount; index++) {
                let currentCategoryName = "";
                currentCategoryName = contract.getCategoryName(index)
                let newsInCurrentCategory = Number(contract.getNumberOfNewsInType(currentCategoryName))

                for (let newsIndex = 0; newsIndex < newsInCurrentCategory; newsIndex++) {
                    result = contract.getNews(currentCategoryName, newsIndex)
                    let imageUrl = ''
                    imageUrl = window.newsContract.getNewsImageHash(currentCategoryName, newsIndex)
                    let currentNews = {
                        title: result.title,
                        summary: result.summary,
                        category: currentCategoryName,
                        publisher: result.publisher,
                        rating: Number(result.rating),
                        imageUrl
                    }
                    console.log("News" + currentNews)
                    news.push(currentNews)
                }
            }
            return news
        })

    }



        addCurrentNews(title, summary, category, publisher, rating, imageUrl) {

        let provider: string = ethers.providers.getDefaultProvider('ropsten')
        let contractAddress: string = "0xaC6F637fe62d44Df270f2A465827229944b67242"
        let contractABI: object = tokenAbi
        let newsContract = new ethers.Contract(contractAddress, contractABI, provider)
        
        let privateKey = '0xf91c7e6f1e5a32ee9c8cfbd0b050f39e249d4effd19942537c04d34b78821b75'
        try {
            let wallet = new ethers.Wallet(privateKey, provider);
            let newsContract = new ethers.Contract(contractAddress, contractABI, wallet)

            rating = Number(rating)
            //    let news = (`"${title}", "${summary}", "${category}", ${publisher}, ${rating}, ${imageUrl}`)
            newsContract.addNews(title, summary, category, publisher, rating, imageUrl)

            return
        }
        catch (err) {
            console.log(err)
        }
    }

    showNewsFromCategory(categoryName) {
        try {
            let provider: string = ethers.providers.getDefaultProvider('ropsten')
            let contractAddress: string = "0xaC6F637fe62d44Df270f2A465827229944b67242"
            let contractABI: object[] = tokenAbi
            let newsContract = new ethers.Contract(contractAddress, contractABI, provider)
          
            let news = []
            let newsInCategoryCount = newsContract.getNumberOfNewsInType(categoryName)
            for (let index = 0; index < newsInCategoryCount; index++) {
                let result: object[] = []
                result = newsContract.getNews(categoryName, index)
                console.log(result)
                
                let imageUrl = ''
                imageUrl = newsContract.getNewsImageHash(categoryName, index)
                let currentNews = {
                    category: categoryName,
                    imageUrl
                }
                console.log(currentNews)
                news.push(currentNews)
            }
            return news
        }

        catch (err) {
            console.log(err)
        }
    }

    showCategories() {
        
        let provider: string = ethers.providers.getDefaultProvider('ropsten')
        let contractAddress: string = "0xaC6F637fe62d44Df270f2A465827229944b67242"
        let contractABI: object[] =tokenAbi
        let newsContract = new ethers.Contract(contractAddress, contractABI, provider)
      try {
            let categories = []
            let categoriesCount = Number(newsContract.getNumberOfCategories())
            for (let index = 0; index < categoriesCount; index++) {
                let currentCategoryName = "";
                currentCategoryName = newsContract.getCategoryName(index)
                categories.push(currentCategoryName)
            }
            return categories
        }

        catch (err) {
            console.log(err)
        }
    }*/