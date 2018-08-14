let abi =  [{
    "constant": false,
    "inputs": [
        {
            "name": "_title",
            "type": "string"
        },
        {
            "name": "_summary",
            "type": "string"
        },
        {
            "name": "_category",
            "type": "string"
        },
        {
            "name": "_publisher",
            "type": "address"
        },
        {
            "name": "_rating",
            "type": "int256"
        },
        {
            "name": "_imageHash",
            "type": "string"
        }
    ],
    "name": "addNews",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "constant": true,
    "inputs": [
        {
            "name": "_index",
            "type": "uint256"
        }
    ],
    "name": "getCategoryName",
    "outputs": [
        {
            "name": "title",
            "type": "string"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [
        {
            "name": "_category",
            "type": "string"
        },
        {
            "name": "_index",
            "type": "uint256"
        }
    ],
    "name": "getNews",
    "outputs": [
        {
            "name": "title",
            "type": "string"
        },
        {
            "name": "summary",
            "type": "string"
        },
        {
            "name": "publisher",
            "type": "address"
        },
        {
            "name": "rating",
            "type": "int256"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [
        {
            "name": "_category",
            "type": "string"
        },
        {
            "name": "_index",
            "type": "uint256"
        }
    ],
    "name": "getNewsImageHash",
    "outputs": [
        {
            "name": "imageHash",
            "type": "string"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [],
    "name": "getNumberOfCategories",
    "outputs": [
        {
            "name": "count",
            "type": "uint256"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [
        {
            "name": "_category",
            "type": "string"
        }
    ],
    "name": "getNumberOfNewsInType",
    "outputs": [
        {
            "name": "count",
            "type": "uint256"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}]
module.exports= abi