import * as MESSAGES from '../constants/messages';
import type { SubscriptionAccountInfo, BlockchainSettings, ChanellMessage } from './common';
import type {
    AccountBalanceHistoryParams,
    GetCurrentFiatRatesParams,
    GetFiatRatesForTimestampsParams,
    GetFiatRatesTickersListParams,
    EstimateFeeParams,
    AccountInfoParams,
} from './params';

// messages sent from blockchain.js to worker

export interface Connect {
    type: typeof MESSAGES.CONNECT;
}
export interface Disconnect {
    type: typeof MESSAGES.DISCONNECT;
}

export interface GetInfo {
    type: typeof MESSAGES.GET_INFO;
}

export interface GetBlockHash {
    type: typeof MESSAGES.GET_BLOCK_HASH;
    payload: number;
}

export interface GetAccountInfo {
    type: typeof MESSAGES.GET_ACCOUNT_INFO;
    payload: AccountInfoParams;
}

export interface GetAccountUtxo {
    type: typeof MESSAGES.GET_ACCOUNT_UTXO;
    payload: string; // address or xpub
}

export interface GetTransaction {
    type: typeof MESSAGES.GET_TRANSACTION;
    payload: string;
}

export interface GetFiatRatesTickersList {
    type: typeof MESSAGES.GET_FIAT_RATES_TICKERS_LIST;
    payload: GetFiatRatesTickersListParams;
}

export interface GetAccountBalanceHistory {
    type: typeof MESSAGES.GET_ACCOUNT_BALANCE_HISTORY;
    payload: AccountBalanceHistoryParams;
}

export interface GetCurrentFiatRates {
    type: typeof MESSAGES.GET_CURRENT_FIAT_RATES;
    payload: GetCurrentFiatRatesParams;
}

export interface GetFiatRatesForTimestamps {
    type: typeof MESSAGES.GET_FIAT_RATES_FOR_TIMESTAMPS;
    payload: GetFiatRatesForTimestampsParams;
}

export interface EstimateFee {
    type: typeof MESSAGES.ESTIMATE_FEE;
    payload: EstimateFeeParams;
}

export interface Subscribe {
    type: typeof MESSAGES.SUBSCRIBE;
    payload:
        | {
              type: 'block';
          }
        | {
              type: 'addresses';
              addresses: string[];
          }
        | {
              type: 'accounts';
              accounts: SubscriptionAccountInfo[];
          }
        | {
              type: 'fiatRates';
              currency?: string;
          };
}

export interface Unsubscribe {
    type: typeof MESSAGES.UNSUBSCRIBE;
    payload:
        | {
              type: 'block';
          }
        | {
              type: 'addresses';
              addresses?: string[];
          }
        | {
              type: 'accounts';
              accounts?: SubscriptionAccountInfo[];
          }
        | {
              type: 'fiatRates';
          };
}

export interface PushTransaction {
    type: typeof MESSAGES.PUSH_TRANSACTION;
    payload: string;
}

export type Message =
    | ChanellMessage<{ type: typeof MESSAGES.TERMINATE; payload?: typeof undefined }>
    | ChanellMessage<{ type: typeof MESSAGES.HANDSHAKE; settings: BlockchainSettings }>
    | ChanellMessage<Connect>
    | ChanellMessage<Disconnect>
    | ChanellMessage<GetInfo>
    | ChanellMessage<GetBlockHash>
    | ChanellMessage<GetAccountInfo>
    | ChanellMessage<GetAccountUtxo>
    | ChanellMessage<GetTransaction>
    | ChanellMessage<GetCurrentFiatRates>
    | ChanellMessage<GetFiatRatesForTimestamps>
    | ChanellMessage<GetAccountBalanceHistory>
    | ChanellMessage<GetFiatRatesTickersList>
    | ChanellMessage<EstimateFee>
    | ChanellMessage<Subscribe>
    | ChanellMessage<Unsubscribe>
    | ChanellMessage<PushTransaction>;
