const EasyGraphqlLoadTester = require('easygraphql-load-tester');
const fs = require('fs');
const path = require('path');

const userSchema = fs.readFileSync(
    path.join(__dirname, "src/graphql/schema", "/user.graphql"), "utf8"
)

const postSchema = fs.readFileSync(
    path.join(__dirname, "src/graphql/schema", "/post.graphql"), "utf8"
)

const tester = new EasyGraphqlLoadTester([userSchema, postSchema]);