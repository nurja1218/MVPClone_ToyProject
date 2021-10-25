import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentMenuState } from '../../../recoil/atoms';
import TransportContainer from '../../containers/TransportContainer';
import { useTranslation } from 'react-i18next';

export default function TransportPage() {
    const { t } = useTranslation();
    const setCurrentMenu = useSetRecoilState(currentMenuState);
    useEffect(() => {
        setCurrentMenu([t('배송별 관제')]);
    }, [setCurrentMenu, t]);
    return (
        <div>
            <TransportContainer />
        </div>
    );
}
