"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv-safe/config");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const HelloResolver_1 = require("./resolvers/HelloResolver");
const stock_1 = require("./resolvers/stock");
const mention_1 = require("./resolvers/mention");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        database: 'etfdb',
        logging: true,
        synchronize: true,
    });
    const app = express_1.default();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [HelloResolver_1.HelloResolver, stock_1.StockResolver, mention_1.MentionResolver],
            validate: false,
        }),
        context: ({ res, req }) => ({
            req,
            res,
        }),
    });
    apolloServer.applyMiddleware({ app });
    app.listen(process.env.PORT, () => {
        console.log(`Server running on localhost:${process.env.PORT}`);
    });
});
main();
//# sourceMappingURL=index.js.map