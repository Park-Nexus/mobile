import {createBottomTabNavigator} from '@src/libs/bottomTabNavigator';

import {Home} from '@src/nav/screens/Root.Main.App.Tabs/Home';
import {Settings} from '@src/nav/screens/Root.Main.App.Tabs/Settings';
import {Ticket} from '@src/nav/screens/Root.Main.App.Tabs/Ticket';

import HomeSvg from '@src/static/svgs/Home.svg';
import HomeTealSvg from '@src/static/svgs/HomeTeal.svg';

import MagnifyingGlass from '@src/static/svgs/MagnifyingGlass.svg';
import MagnifyingGlassTeal from '@src/static/svgs/MagnifyingGlassTeal.svg';

import Receipt from '@src/static/svgs/Receipt.svg';
import ReceiptTeal from '@src/static/svgs/ReceiptTeal.svg';

import SettingsSvg from '@src/static/svgs/Settings.svg';
import SettingsSvgTeal from '@src/static/svgs/SettingsTeal.svg';

const {Navigator, Screen} = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Navigator>
      <Screen
        name="Home"
        component={Home}
        options={{tabBarIcon: ({focused}) => (focused ? <HomeTealSvg /> : <HomeSvg />)}}
      />
      {/* <Screen
        name="Search"
        component={Search}
        options={{tabBarIcon: ({focused}) => (focused ? <MagnifyingGlassTeal /> : <MagnifyingGlass />)}}
      /> */}
      <Screen
        name="Ticket"
        component={Ticket}
        options={{tabBarIcon: ({focused}) => (focused ? <ReceiptTeal /> : <Receipt />)}}
      />
      <Screen
        name="Settings"
        component={Settings}
        options={{tabBarIcon: ({focused}) => (focused ? <SettingsSvgTeal /> : <SettingsSvg />)}}
      />
    </Navigator>
  );
}
