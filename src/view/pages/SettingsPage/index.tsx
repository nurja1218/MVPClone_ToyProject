import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentMenuState } from '../../../recoil/atoms';
import { useTranslation } from 'react-i18next';
import SettingsContainer from '../../containers/SettingsContainer';

export default function SettingsPage() {
    const { t } = useTranslation();
    const setCurrentMenu = useSetRecoilState(currentMenuState);
    useEffect(() => {
        setCurrentMenu([t('메인')]);
    }, [setCurrentMenu, t]);
    return (
        <div>
            <SettingsContainer />
        </div>
    );
}
