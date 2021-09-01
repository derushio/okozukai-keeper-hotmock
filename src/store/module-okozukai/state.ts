import { Dayjs } from 'dayjs';

export interface OkozukaiStateInterface {
  userId: number | null;
  user: OkozukaiUser | null;
  isFetchingUser: boolean;
  users: OkozukaiUser[];

  nowOkozukai: number;
  isCalcingNowOkozukai: boolean;

  histories: OkozukaiHistory[];
  isFetchingHistories: boolean;

  rules: OkozukaiRule[];
  isFetchingRules: boolean;
}

export interface OkozukaiUser {
  id?: number;
  name: string;
}

export interface OkozukaiHistory {
  id?: number;
  date: Dayjs;
  title: string;
  value: number;
  rule?: OkozukaiRule;
}

/**
 * お小遣いの定期ルール
 */
export interface OkozukaiRule {
  id?: number;
  title: string;
  value: number;
  /**
   * 毎○ごとか毎年日付指定か切り替える
   */
  mode: 'span' | 'date';
  /**
   * 毎○ごと
   * 例えば、monthly 1だと毎月１日に実行
   */
  spanEvery: 'hour' | 'day' | 'month';
  spanPeriod: number;
  /**
   * 毎年日付指定
   * MM/DD
   */
  date: string;
  startTime: Dayjs;
  endTime?: Dayjs;
}

function state(): OkozukaiStateInterface {
  return {
    userId: null,
    user: null,
    isFetchingUser: true,
    users: [],

    nowOkozukai: 0,
    isCalcingNowOkozukai: false,

    histories: [],
    isFetchingHistories: false,

    rules: [],
    isFetchingRules: false,
  };
}

export default state;
