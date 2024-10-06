import {LotBottomSheet} from './Home.LotBottomSheet';
import {HomeContext} from './index.$context';
import {Map} from './index.map';

export function Home() {
  return (
    <HomeContext>
      <Map />
      <LotBottomSheet />
    </HomeContext>
  );
}
