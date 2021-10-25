import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentMenuState } from '../../../recoil/atoms';
import ControlContainer from '../../containers/ControlContainer';
import { useTranslation } from 'react-i18next';

export default function ControlPage() {
    const { t } = useTranslation();
    const setCurrentMenu = useSetRecoilState(currentMenuState);
    useEffect(() => {
        setCurrentMenu([t('관제')]);
    }, [setCurrentMenu, t]);
    return (
        <div>
            <ControlContainer />
        </div>
    );
}
