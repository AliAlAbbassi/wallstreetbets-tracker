export interface mention {
  message: string;
  stock_id: string;
  source: string;
  url: string;
  dt: string;
}

export interface numberOfMentions {
  num_mentions: number;
  symbol: string;
  stock_id: string;
}
