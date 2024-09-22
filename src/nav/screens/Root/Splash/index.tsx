import {Image, ImageBackground} from 'react-native';

import Background from '@src/static/images/Splash__Background.png';
import Logo from '@src/static/icons/Logo_Vertical.png';

import {styles} from './index.styles';

export function SplashScreen() {
  return (
    <ImageBackground
      source={Background}
      imageStyle={styles.backgroundImg}
      style={styles.wrapper}>
      <Image source={Logo} style={styles.logoImg} />
    </ImageBackground>
  );
}
