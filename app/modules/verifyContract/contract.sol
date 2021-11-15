pragma solidity ^0.5.5;
contract Twitter {
    uint256 count = 0;
    mapping(string => Tweet) public tweets;
    struct Tweet {
        string tweetId;
        string text;
        string authorId;
        string createdAt;
        uint256 savedAt;
    }
    function createTweet(string memory _tweetId, string memory _text, string memory _authorId, string memory _createdAt)
        public
        returns (string memory, string memory)
    {
        tweets[_tweetId] = Tweet(_tweetId, _text, _authorId, _createdAt, now);
        count += 1;
        return (
            _tweetId,
            "tweet transaction submitted to blockchain"
            );
    }
    function getTweetFromTweetId(string memory tweetId)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            uint256
        )
    {
        return (
            tweets[tweetId].tweetId,
            tweets[tweetId].text,
            tweets[tweetId].authorId,
            tweets[tweetId].createdAt,
            tweets[tweetId].savedAt
        );
    }
    function getCount() public view returns (uint256) {
        return count;
    }
}