const EasyGraphqlTester = require('easygraphql-tester');
const fs = require('fs');
const path = require('path');

// const userSchema = fs.readFileSync(
//     path.join(__dirname, "src/graphql/schema", "/user.graphql"), "utf8"
// )

// const postSchema = fs.readFileSync(
//     path.join(__dirname, "src/graphql/schema", "/post.graphql"), "utf8"
// )

// const tester = new EasyGraphqlTester([userSchema, postSchema]);

// describe("Test The Schema, Query", () => {
//     let userTester:any, postTester:any;
//     beforeAll(() => {
//         userTester = new EasyGraphqlTester(userSchema);
//         postTester = new EasyGraphqlTester(postSchema);
//     })
// })

const schemaCode = fs.readFileSync(
    path.join(__dirname, "..", "schema.gql"), "utf8"
)

describe("Testing Schema, Query", () => {
    let tester;
    beforeAll(() => {
        tester = new EasyGraphqlTester(schemaCode);
    });

    describe("Queries", () => {
        test("Should Pass with Query", () => {
            const query = `
            {
                testInfo(user: "username") {
                    valueOne
                    valueTwo
                }
            }`
            tester.test(true, query);
        });
    });
});