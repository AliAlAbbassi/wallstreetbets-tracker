"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Stock_1 = require("../entities/Stock");
let Stocks = class Stocks {
};
__decorate([
    type_graphql_1.Field(() => [Stock_1.Stock]),
    __metadata("design:type", Array)
], Stocks.prototype, "stocks", void 0);
Stocks = __decorate([
    type_graphql_1.ObjectType()
], Stocks);
let StockResolver = class StockResolver {
    stocks(limit, cursor) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(50, limit) + 1;
            const replacements = [realLimit + 1];
            if (cursor) {
                replacements.push(new Date(parseInt(cursor)));
            }
            const stocks = yield typeorm_1.getConnection().query(`
        select s.* from stock s limit $1
      `, replacements);
            console.log('stocks: ', stocks);
            return {
                stocks: stocks.slice(0, realLimit - 1),
            };
        });
    }
    stock(id) {
        return Stock_1.Stock.findOne(id);
    }
};
__decorate([
    type_graphql_1.Query(() => Stocks),
    __param(0, type_graphql_1.Arg('limit', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg('cursor', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], StockResolver.prototype, "stocks", null);
__decorate([
    type_graphql_1.Query(() => Stock_1.Stock, { nullable: true }),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StockResolver.prototype, "stock", null);
StockResolver = __decorate([
    type_graphql_1.Resolver(Stock_1.Stock)
], StockResolver);
exports.StockResolver = StockResolver;
//# sourceMappingURL=stock.js.map