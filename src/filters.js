import Vue from 'vue';

Vue.filter('trunc', function (value, len) {
  if (!value) return '';

  value = value.toString();
  len = len || 25;

  return value.slice(0,len);
});