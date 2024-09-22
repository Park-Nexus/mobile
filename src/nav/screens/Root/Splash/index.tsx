import {Image, ImageBackground, StatusBar} from 'react-native';

import Background from '@src/static/images/Splash__Background.png';
import Logo from '@src/static/icons/Logo_Vertical.png';

import {styles} from './index.styles';

export function SplashScreen() {
  return (
    <ImageBackground
      source={Background}
      imageStyle={styles.backgroundImg}
      style={styles.wrapper}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Image source={Logo} style={styles.logoImg} />
    </ImageBackground>
  );
}
