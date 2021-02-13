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
exports.MentionResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Mention_1 = require("../entities/Mention");
let Mentions = class Mentions {
};
__decorate([
    type_graphql_1.Field(() => [Mention_1.Mention]),
    __metadata("design:type", Array)
], Mentions.prototype, "mentions", void 0);
Mentions = __decorate([
    type_graphql_1.ObjectType()
], Mentions);
const topMentionedStocksSQL = `
        select count(*) as num_mentions, stock_id, symbol, message, source
        from mention join stock on stock.id = mention.stock_id
        group by stock_id, symbol, message, source
        order by num_mentions DESC
        limit $1;

`;
let MentionResolver = class MentionResolver {
    mentions(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(50, limit) + 1;
            const replacements = [realLimit + 1];
            const mentions = yield typeorm_1.getConnection().query(`
        select * from mention limit $1;
      `, replacements);
            console.log('mentions: ', mentions);
            return {
                mentions: mentions.slice(0, realLimit - 1),
            };
        });
    }
    numberOfMentions(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(50, limit) + 1;
            const replacements = [realLimit + 1];
            const mentions = yield typeorm_1.getConnection().query(topMentionedStocksSQL, replacements);
            console.log('mentions: ', mentions);
            return {
                mentions: mentions.slice(0, realLimit - 1),
            };
        });
    }
};
__decorate([
    type_graphql_1.Query(() => Mentions),
    __param(0, type_graphql_1.Arg('limit', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MentionResolver.prototype, "mentions", null);
__decorate([
    type_graphql_1.Query(() => Mentions),
    __param(0, type_graphql_1.Arg('limit', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MentionResolver.prototype, "numberOfMentions", null);
MentionResolver = __decorate([
    type_graphql_1.Resolver(Mention_1.Mention)
], MentionResolver);
exports.MentionResolver = MentionResolver;
//# sourceMappingURL=mention.js.map