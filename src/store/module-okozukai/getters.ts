import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { OkozukaiStateInterface } from './state';

export interface OkozukaiGettersInterface {
  example: () => string;
}

const getters: GetterTree<OkozukaiStateInterface, StateInterface> &
  OkozukaiGettersInterface = {
  example() {
    return 'example';
  },
};

export default getters;
