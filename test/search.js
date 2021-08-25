const assert = require('assert');
const someDaysTransaction = require('../index');

const requestData = {
    "body": {
        "filter": "All filters",
        "data": "0xca62d56e42b8d4e46a3843b1544fb88405e557b1779a747052ae0c13a17d75e3"
    },
    "success": true,
    "responseCode": 200
};

describe('past-transactions', function () {
    it('should return past days transactions from DB', async function () {
        await someDaysTransaction.getSearchData(requestData, context, function (error, response) {
            if (error) assert.fail(JSON.stringify(error));
            assert.equal(response.responseCode, requestData.responseCode);
        });
    });
});