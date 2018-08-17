pragma solidity ^0.4.23;

contract NewsContract {
    
    struct news{
        string title;
        bytes32 category;
        int rating;
        bytes32 hashed;
        address [] voters;
    }

    mapping (bytes32 => news[]) newsAll;
    
    bytes32[] private categories;
    
    modifier newsExists(bytes32 _category, uint _index) {
        require(newsAll[_category].length > 0);
        _;
    }

    function addNews(string _title, bytes32 _category, bytes32 _hashed) public {
        news memory currentNews;
        currentNews.title = _title;
        currentNews.category = _category;
        currentNews.rating = 0;
        currentNews.hashed = _hashed;
        currentNews.voters = new address[](0);

        if(newsAll[_category].length == 0) {
            categories.push(_category);
        }

        newsAll[_category].push(currentNews);
    }
    
    function getNews(bytes32 _category, uint _index) view public newsExists(_category, _index) returns (string title, int rating, bytes32 hashed) {
        return(
        newsAll[_category][_index].title,
        newsAll[_category][_index].rating,
        newsAll[_category][_index].hashed
        );
    }
    
    function plusRating(bytes32 _category, uint _index, address _voter) public newsExists(_category, _index) returns (bool) {
        
 
        if(newsAll[_category][_index].voters.length > 0){
                for (uint i = 0; i < newsAll[_category][_index].voters.length; i++) {
                    if(newsAll[_category][_index].voters[i] == _voter){
                        return false;
                    }
                }
        }
        
        newsAll[_category][_index].voters.push(_voter);
        newsAll[_category][_index].rating +=1;
        return true;
    }
    
    function minusRating(bytes32 _category, uint _index, address _voter) public newsExists(_category, _index) returns (bool) {

        if(newsAll[_category][_index].voters.length > 0){
                for (uint i = 0; i < newsAll[_category][_index].voters.length; i++) {
                    if(newsAll[_category][_index].voters[i] == _voter){
                        return false;
                    }
                }
        }
        
        newsAll[_category][_index].voters.push(_voter);
        newsAll[_category][_index].rating -=1;
        return true;
    }
    
    
    function getCategoryName(uint _index) view public returns (bytes32 category) {
        require(_index < categories.length);
        return categories[_index];
    }
    
    function getNumberOfCategories() public view returns (uint count) {
        return categories.length;
    }
    
    function getNumberOfNewsInType(bytes32 _category) view public returns (uint count) {
        return newsAll[_category].length;
    }
}