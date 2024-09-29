import {createBottomTabNavigator} from '@src/libs/bottomTabNavigator';

import {Home} from '@src/nav/screens/Root.Main.App.Tabs/Home';
import {Search} from '@src/nav/screens/Root.Main.App.Tabs/Search';
import {Settings} from '@src/nav/screens/Root.Main.App.Tabs/Settings';
import {Ticket} from '@src/nav/screens/Root.Main.App.Tabs/Ticket';

import HomeSvg from '@src/static/svgs/Home.svg';

const {Navigator, Screen} = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Navigator>
      <Screen
        name="Home"
        component={Home}
        options={{tabBarIcon: ({}) => <HomeSvg stroke="#FFF" />}}
      />
      <Screen name="Search" component={Search} />
      <Screen name="Ticket" component={Ticket} />
      <Screen name="Settings" component={Settings} />
    </Navigator>
  );
}
