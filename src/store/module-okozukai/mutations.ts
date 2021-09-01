import { MutationTree } from 'vuex';
import {
  OkozukaiHistory,
  OkozukaiRule,
  OkozukaiStateInterface,
  OkozukaiUser,
} from './state';

const mutation: MutationTree<OkozukaiStateInterface> = {
  setUserId(state, userId: number | null) {
    state.userId = userId;
    if (userId == null) {
      window.localStorage.removeItem('userId');
    } else {
      window.localStorage.setItem('userId', userId.toString());
    }
    if (state.userId != null && state.userId !== userId) {
      location.reload();
      return;
    }
  },
  setUser(state, user: OkozukaiUser | null) {
    state.user = user;
  },
  setIsFetchingUser(state, isFetchingUser: boolean) {
    state.isFetchingUser = isFetchingUser;
  },

  setNowOkozukai(state, nowOkozukai: number) {
    state.nowOkozukai = nowOkozukai;
  },
  setIsCalcingNowOkozukai(state, isCalcingNowOkozukai: boolean) {
    state.isCalcingNowOkozukai = isCalcingNowOkozukai;
  },

  setHistories(state, histories: OkozukaiHistory[]) {
    state.histories = histories;
  },
  setIsFetchingHistories(state, isFetchingHistories: boolean) {
    state.isFetchingHistories = isFetchingHistories;
  },

  setRules(state, rules: OkozukaiRule[]) {
    state.rules = rules;
  },
  setIsFetchingRules(state, isFetchingRules: boolean) {
    state.isFetchingRules = isFetchingRules;
  },
};

export default mutation;
