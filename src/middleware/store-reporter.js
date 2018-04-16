export default store => next => action => {
  let result = next(action);
  console.group('__STATE__:');
  console.log(store.getState());
  console.groupEnd();
  return result;
};