import {Platform, Dimensions} from 'react-native';

const Screen = Dimensions.get('window');
export const SCREEN_WIDTH = Screen.width;
export const SCREEN_HEIGHT = Screen.height;
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isMWeb = Platform.OS === 'web';
export const INPUT_RANGE_START = 0;
export const INPUT_RANGE_END = 1;
export const OUTPUT_RANGE_START = -281;
export const OUTPUT_RANGE_END = 0;
export const ANIMATION_TO_VALUE = 1;
export const ANIMATION_DURATION = 25000; // 

export const logErrorWithMessage = (message, errorSource) => {
  if (__DEV__) {
    console.log(message, errorSource);
  }
};