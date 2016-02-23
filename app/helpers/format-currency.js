import Ember from 'ember';

export function formatCurrency(value) {
  return accounting.formatMoney(value);
}

export default Ember.Helper.helper(formatCurrency);
