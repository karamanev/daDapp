const ethers = require ('ethers')
const config = require ('./contractInfo')

let provider = ethers.providers.getDefaultProvider('ropsten')
let contractAddress = config.getContractAddress()
let contractABI = config.getContractABI()
let newsContract = new ethers.Contract(contractAddress, contractABI, provider)

async function showNews() {
    try {
        let news = []
        let categoriesCount = Number(await newsContract.getNumberOfCategories())
        for (let index = 0; index < categoriesCount; index++) {
            let currentCategoryName = "";
            currentCategoryName = await newsContract.getCategoryName(index)
            let newsInCurrentCategory = Number(await newsContract.getNumberOfNewsInType(currentCategoryName))

            for (let newsIndex = 0; newsIndex < newsInCurrentCategory; newsIndex++) {
                let result = []
                result = await newsContract.getNews(currentCategoryName, newsIndex)
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

async function addCurrentNews(title, category, hashed) {
    let privateKey = '0xf91c7e6f1e5a32ee9c8cfbd0b050f39e249d4effd19942537c04d34b78821b75'
    try {
        let wallet = await new ethers.Wallet(privateKey, provider);
        let newsContract = await new ethers.Contract(contractAddress, contractABI, wallet)
        await newsContract.addNews(title, category, hashed)
        return
    }
    catch (err) {
        console.log(err)
    }
}

async function showNewsFromCategory(categoryName) {
    try {
        let news = []
        let newsInCategoryCount = Number(await newsContract.getNumberOfNewsInType(categoryName))
        for (let index = 0; index < newsInCategoryCount; index++) {
            let result = []
            result = await newsContract.getNews(categoryName, index)
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

async function showCategories() {
  try {
        let categories = []
        let categoriesCount = Number(await newsContract.getNumberOfCategories())
        for (let index = 0; index < categoriesCount; index++) {
            let currentCategoryName = "";
            currentCategoryName = await newsContract.getCategoryName(index)
            categories.push(currentCategoryName)
        }
      console.log(categoriesCount)
        return categories
    }

    catch (err) {
        console.log(err)
    }
}

async function ratePlus(category, index, voter) {
    let wallet = "0x0c9276e4899bf32557fd96ab06a6f85042fac2d0"
    try {
        await newsContract.plusRating(category, index, wallet)
    }
    catch (err) {
        console.log(err)
    }
}

async function rateMinus(category, index, voter) {
    let wallet = "0x0c9276e4899bF32557fd96AB06a6F85042faC2d0"
    try {
        await newsContract.minusRating(category, index, wallet)
    }

    catch (err) {
        console.log(err)
    }
}


//ratePlus("0x1234", 0, "voter")
// rateMinus(category, index, voter)

//addCurrentNews("ddd", "0x1234", "0x1234")
showNews().then(a => console.log(a))
//showCategories().then(a => console.log(a))
//showNewsFromCategory("0x1234000000000000000000000000000000000000000000000000000000000000").then(a => console.log(a))
