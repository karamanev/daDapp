pragma solidity ^0.4.23;

contract News {
    
    struct news{
        string title;
        string category;
        int rating;
        string hash;
    }
    
    mapping (string => news[]) newsAll;
    
    string[] private categories;
    
    modifier newsExists(string _category, uint _index) {
        require(newsAll[_category].length > 0);
        _;
    }

    function addNews(string _title, string _category, string _hash) public {
        news memory currentNews;
        currentNews.title = _title;
        currentNews.category = _category;
        currentNews.rating = 0;
        currentNews.hash = _hash;

        if(newsAll[_category].length == 0) {
            categories.push(_category);
        }

        newsAll[_category].push(currentNews);
    }
    
    function getNews(string _category, uint _index) view public newsExists(_category, _index) returns (string title, int rating, string hash) {
        return(
        newsAll[_category][_index].title,
        newsAll[_category][_index].rating,
        newsAll[_category][_index].hash
        );
    }
    
    function getCategoryName(uint _index) view public returns (string title) {
        require(_index < categories.length);
        return categories[_index];
    }
    
    function getNumberOfCategories() public view returns (uint count) {
        return categories.length;
    }
    
    function getNumberOfNewsInType(string _category) view public returns (uint count) {
        return newsAll[_category].length;
    }
}