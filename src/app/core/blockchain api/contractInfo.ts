export class contractInfo {

    constructor(){

    }
    getContractOwner() {
        return "0x0c9276e4899bF32557fd96AB06a6F85042faC2d0"
    }
    getContractAddress() {
        return "0x4d1a34ccf6f4ba4e957e012c6b98eb2e1ed19583"
    }
    getContractABI() {
        let abi = [
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
                        "name": "rating",
                        "type": "int256"
                    },
                    {
                        "name": "hashed",
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
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_title",
                        "type": "string"
                    },
                    {
                        "name": "_category",
                        "type": "string"
                    },
                    {
                        "name": "_hashed",
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
                "constant": false,
                "inputs": [
                    {
                        "name": "_category",
                        "type": "string"
                    },
                    {
                        "name": "_index",
                        "type": "uint256"
                    },
                    {
                        "name": "_voter",
                        "type": "address"
                    }
                ],
                "name": "minusRating",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
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
                        "name": "category",
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
                "constant": false,
                "inputs": [
                    {
                        "name": "_category",
                        "type": "string"
                    },
                    {
                        "name": "_index",
                        "type": "uint256"
                    },
                    {
                        "name": "_voter",
                        "type": "address"
                    }
                ],
                "name": "plusRating",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]
        return abi
    }

    byteCode() {
        return "608060405234801561001057600080fd5b5061138d806100206000396000f3006080604052600436106100825763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166305f4e7ed811461008757806329aad437146101c75780635d7ab0e1146102325780638c60f35914610309578063d1656c1714610387578063d26137c814610414578063d8dbad0514610429575b600080fd5b34801561009357600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526100e294369492936024939284019190819084018382808284375094975050933594506104939350505050565b604051808060200184815260200180602001838103835286818151815260200191508051906020019080838360005b83811015610129578181015183820152602001610111565b50505050905090810190601f1680156101565780820380516001836020036101000a031916815260200191505b50838103825284518152845160209182019186019080838360005b83811015610189578181015183820152602001610171565b50505050905090810190601f1680156101b65780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b3480156101d357600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526102209436949293602493928401919081908401838280828437509497506107bf9650505050505050565b60408051918252519081900360200190f35b34801561023e57600080fd5b506040805160206004803580820135601f810184900484028501840190955284845261030794369492936024939284019190819084018382808284375050604080516020601f89358b018035918201839004830284018301909452808352979a99988101979196509182019450925082915084018382808284375050604080516020601f89358b018035918201839004830284018301909452808352979a9998810197919650918201945092508291508401838280828437509497506108269650505050505050565b005b34801561031557600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526103739436949293602493928401919081908401838280828437509497505084359550505050602090910135600160a060020a031690506109fc565b604080519115158252519081900360200190f35b34801561039357600080fd5b5061039f600435610d9c565b6040805160208082528351818301528351919283929083019185019080838360005b838110156103d95781810151838201526020016103c1565b50505050905090810190601f1680156104065780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561042057600080fd5b50610220610e55565b34801561043557600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526103739436949293602493928401919081908401838280828437509497505084359550505050602090910135600160a060020a03169050610e5c565b6060600060608484600080836040518082805190602001908083835b602083106104ce5780518252601f1990920191602091820191016104af565b51815160209384036101000a600019018019909216911617905292019485525060405193849003019092205492909211915061050b905057600080fd5b6000876040518082805190602001908083835b6020831061053d5780518252601f19909201916020918201910161051e565b51815160209384036101000a600019018019909216911617905292019485525060405193849003019092208054909250889150811061057857fe5b90600052602060002090600502016000016000886040518082805190602001908083835b602083106105bb5780518252601f19909201916020918201910161059c565b51815160209384036101000a60001901801990921691161790529201948552506040519384900301909220805490925089915081106105f657fe5b9060005260206000209060050201600201546000896040518082805190602001908083835b6020831061063a5780518252601f19909201916020918201910161061b565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922080549092508a9150811061067557fe5b9060005260206000209060050201600301828054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561071b5780601f106106f05761010080835404028352916020019161071b565b820191906000526020600020905b8154815290600101906020018083116106fe57829003601f168201915b5050845460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152959850869450925084019050828280156107a95780601f1061077e576101008083540402835291602001916107a9565b820191906000526020600020905b81548152906001019060200180831161078c57829003601f168201915b5050505050905094509450945050509250925092565b600080826040518082805190602001908083835b602083106107f25780518252601f1990920191602091820191016107d3565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922054949350505050565b61082e6111fa565b838152602080820184905260006040808401829052606084018590528051828152808401825260808501525185519192869282918401908083835b602083106108885780518252601f199092019160209182019101610869565b51815160209384036101000a600019018019909216911617905292019485525060405193849003019092205415159150610904905057600180548082018083556000929092528451610901917fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60190602087019061122a565b50505b6000836040518082805190602001908083835b602083106109365780518252601f199092019160209182019101610917565b51815160209384036101000a600019018019909216911617905292019485525060405193849003810190932080546001810180835560009283529185902086518051939688965060059093029091019350610997928492919091019061122a565b5060208281015180516109b0926001850192019061122a565b5060408201516002820155606082015180516109d691600384019160209091019061122a565b50608082015180516109f29160048401916020909101906112a8565b5050505050505050565b6000808484600080836040518082805190602001908083835b60208310610a345780518252601f199092019160209182019101610a15565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922054929092119150610a71905057600080fd5b600080886040518082805190602001908083835b60208310610aa45780518252601f199092019160209182019101610a85565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922080549092508991508110610adf57fe5b9060005260206000209060050201600401805490501115610c4c57600092505b6000876040518082805190602001908083835b60208310610b315780518252601f199092019160209182019101610b12565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922080549092508891508110610b6c57fe5b906000526020600020906005020160040180549050831015610c4c5784600160a060020a03166000886040518082805190602001908083835b60208310610bc45780518252601f199092019160209182019101610ba5565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922080549092508991508110610bff57fe5b906000526020600020906005020160040184815481101515610c1d57fe5b600091825260209091200154600160a060020a03161415610c415760009350610d92565b600190920191610aff565b6000876040518082805190602001908083835b60208310610c7e5780518252601f199092019160209182019101610c5f565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922080549092508891508110610cb957fe5b6000918252602080832060059290920290910160040180546001808201835591845282842001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a038a161790556040518a519193928b9282918401908083835b60208310610d375780518252601f199092019160209182019101610d18565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922080549092508991508110610d7257fe5b600091825260209091206002600590920201018054919091039055600193505b5050509392505050565b6001546060908210610dad57600080fd5b6001805483908110610dbb57fe5b600091825260209182902001805460408051601f6002600019610100600187161502019094169390930492830185900485028101850190915281815292830182828015610e495780601f10610e1e57610100808354040283529160200191610e49565b820191906000526020600020905b815481529060010190602001808311610e2c57829003601f168201915b50505050509050919050565b6001545b90565b6000808484600080836040518082805190602001908083835b60208310610e945780518252601f199092019160209182019101610e75565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922054929092119150610ed1905057600080fd5b600080886040518082805190602001908083835b60208310610f045780518252601f199092019160209182019101610ee5565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922080549092508991508110610f3f57fe5b90600052602060002090600502016004018054905011156110ac57600092505b6000876040518082805190602001908083835b60208310610f915780518252601f199092019160209182019101610f72565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922080549092508891508110610fcc57fe5b9060005260206000209060050201600401805490508310156110ac5784600160a060020a03166000886040518082805190602001908083835b602083106110245780518252601f199092019160209182019101611005565b51815160209384036101000a600019018019909216911617905292019485525060405193849003019092208054909250899150811061105f57fe5b90600052602060002090600502016004018481548110151561107d57fe5b600091825260209091200154600160a060020a031614156110a15760009350610d92565b600190920191610f5f565b6000876040518082805190602001908083835b602083106110de5780518252601f1990920191602091820191016110bf565b51815160209384036101000a600019018019909216911617905292019485525060405193849003019092208054909250889150811061111957fe5b6000918252602080832060059290920290910160040180546001808201835591845282842001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a038a161790556040518a519193928b9282918401908083835b602083106111975780518252601f199092019160209182019101611178565b51815160209384036101000a60001901801990921691161790529201948552506040519384900301909220805490925089915081106111d257fe5b6000918252602090912060026005909202010180549091019055600193505050509392505050565b60a06040519081016040528060608152602001606081526020016000815260200160608152602001606081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061126b57805160ff1916838001178555611298565b82800160010185558215611298579182015b8281111561129857825182559160200191906001019061127d565b506112a4929150611316565b5090565b82805482825590600052602060002090810192821561130a579160200282015b8281111561130a578251825473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039091161782556020909201916001909101906112c8565b506112a4929150611330565b610e5991905b808211156112a4576000815560010161131c565b610e5991905b808211156112a457805473ffffffffffffffffffffffffffffffffffffffff191681556001016113365600a165627a7a72305820dcb7cf4fe630628a7602b6ff28d0dd5c79d8905ae64e888676329cda9cd9accf0029"
    }

}