import { gql } from 'apollo-angular';

export const GET_MENTIONS = gql`
  query {
    mentions(limit: 10) {
      mentions {
        stock_id
        message
        source
      }
    }
  }
`;

export const GET_TOP_MENTIONS = gql`
  query GetTopStockMentions($limit: Int!) {
    numberOfMentions(limit: $limit) {
      mentions {
        num_mentions
        symbol
        stock_id
      }
    }
  }
`;
