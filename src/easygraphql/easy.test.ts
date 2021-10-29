const EasyGraphqlTester = require('easygraphql-tester');
const fs = require('fs');
const path = require('path');

const schemaCode = fs.readFileSync(
    path.join(__dirname, "src/graphql/schema", "/_Query.graphql"),
    "utf8"
)
