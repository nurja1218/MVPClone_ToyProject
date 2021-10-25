import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentMenuState } from '../../../recoil/atoms';
import { useTranslation } from 'react-i18next';
import UserContainer from '../../containers/UserContainer';

export default function UserPage() {
    const { t } = useTranslation();
    const setCurrentMenu = useSetRecoilState(currentMenuState);
    useEffect(() => {
        setCurrentMenu([t('사용자')]);
    }, [setCurrentMenu, t]);
    return (
        <div>
            <UserContainer />
        </div>
    );
}
