import {LotDetailModal} from './Home.LotDetailModal';
import {HomeContext} from './index.$context';
import {Map} from './index.map';

export function Home() {
    return (
        <HomeContext>
            <Map />
            <LotDetailModal />
        </HomeContext>
    );
}
