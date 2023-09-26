// Generated by https://quicktype.io

export interface QuoteResponse {
  nextPag: string
  prevPag: string
  count: number
  results: Result[]
}

export interface Result {
  id: string
  amountIsUnitCount: boolean
  createdAt: AtedAt
  assetId: string
  unitCount: number
  status: Status
  baseAmount: number
  accountId: string
  feeAmount: number
  exchangeId: string
  totalAmount: number
  amount: number
  transactionType: TransactionType
  code: string
  updatedAt?: AtedAt
  tradeId?: null
}

export enum Code {
  Ada = 'ADA',
  Btc = 'BTC',
  Ltc = 'LTC',
  Usdt = 'USDT',
}

export interface AtedAt {
  _seconds: number
  _nanoseconds: number
}

export enum Status {
  Cancel = 'cancel',
  Pending = 'pending',
  Process = 'process',
}

export enum TransactionType {
  Buy = 'buy',
  Sell = 'sell',
}
