module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo'
    ], //여기 아래 plugins를 추가해주시면 됩니다.
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
 
};
