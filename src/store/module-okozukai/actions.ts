import lodash from 'lodash';
import { wait } from 'src/boot/wait';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { OkozukaiHistory, OkozukaiRule, OkozukaiStateInterface } from './state';

let historyIdCounter = 1;
let ruleIdCounter = 1;

const actions: ActionTree<OkozukaiStateInterface, StateInterface> = {
  // user
  async fetchUser(context) {
    context.commit('setIsFetchingUser', true);
    try {
      await wait(500);
      if (context.state.userId != null) {
        // TODO: fetchUser
        const user = {
          id: context.state.userId,
          name: 'narumi',
        };
        context.commit('setUser', user);
      } else {
        throw new Error('user is null.');
      }

      void context.dispatch('fetchHistories');
    } finally {
      context.commit('setIsFetchingUser', false);
    }
  },

  // nowOkozukai
  async calcNowOkozukai(context) {
    context.commit('setIsCalcingNowOkozukai', true);
    try {
      if (!context.state.user) {
        throw new Error();
      }

      await wait(500);
      const nowOkozukai = context.state.histories.reduce(
        (prev, v) => v.value + prev,
        0
      );
      context.commit('setNowOkozukai', nowOkozukai);
    } finally {
      context.commit('setIsCalcingNowOkozukai', false);
    }
  },

  // hietories
  async fetchHistories(context) {
    context.commit('setIsFetchingHistories', true);
    try {
      void context.dispatch('calcNowOkozukai');
      await wait(500);
    } finally {
      context.commit('setIsFetchingHistories', false);
    }
  },
  async createHistory(context, history: OkozukaiHistory) {
    const cloneHistory = lodash.cloneDeep({
      ...history,
      id: historyIdCounter++,
    });

    await wait(500);
    const histories = [...context.state.histories, cloneHistory];
    context.commit('setHistories', histories);

    void context.dispatch('fetchHistories');
    return lodash.cloneDeep(cloneHistory);
  },
  async updateHistory(context, history: OkozukaiHistory) {
    const cloneHistory = lodash.cloneDeep(history);

    await wait(500);
    const histories = context.state.histories.map((v) => {
      if (v.id === cloneHistory.id) {
        return cloneHistory;
      }
      return lodash.cloneDeep(v);
    });
    context.commit('setHistories', histories);

    void context.dispatch('fetchHistories');
    return lodash.cloneDeep(cloneHistory);
  },
  async deleteHistory(context, historyId: number) {
    await wait(500);
    const histories = context.state.histories.filter((v) => {
      return v.id !== historyId;
    });
    context.commit('setHistories', histories);

    void context.dispatch('fetchHistories');
  },

  async findHistoryById(context, historyId: number) {
    await wait(500);
    return (
      lodash.cloneDeep(
        context.state.histories.find((v) => v.id === historyId)
      ) || null
    );
  },

  // rules
  async fetchRules(context) {
    context.commit('setIsFetchingRules', true);
    try {
      await wait(500);
    } finally {
      context.commit('setIsFetchingRules', false);
    }
  },
  async createRule(context, rule: OkozukaiRule) {
    const cloneRule = lodash.cloneDeep({
      ...rule,
      id: ruleIdCounter++,
    });

    await wait(500);
    const rules = [...context.state.rules, cloneRule];
    context.commit('setRules', rules);

    void context.dispatch('fetchRules');
    return lodash.cloneDeep(cloneRule);
  },
  async updateRule(context, rule: OkozukaiRule) {
    const cloneRule = lodash.cloneDeep(rule);

    await wait(500);
    const rules = context.state.rules.map((v) => {
      if (v.id === cloneRule.id) {
        return cloneRule;
      }
      return lodash.cloneDeep(v);
    });
    context.commit('setRules', rules);

    void context.dispatch('fetchRules');
    return lodash.cloneDeep(cloneRule);
  },
  async deleteRule(context, ruleId: number) {
    await wait(500);
    const rules = context.state.rules.filter((v) => {
      return v.id !== ruleId;
    });
    context.commit('setRules', rules);

    void context.dispatch('fetchRules');
  },

  async findRuleById(context, ruleId: number) {
    await wait(500);
    return (
      lodash.cloneDeep(context.state.rules.find((v) => v.id === ruleId)) || null
    );
  },
};

export default actions;
