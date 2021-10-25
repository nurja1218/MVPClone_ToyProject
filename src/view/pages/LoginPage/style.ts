import { makeStyles } from '@mui/styles';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    imageGrid: {
        backgroundImage: 'url(https://willog.io/assets/images/content/otq.gif)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    avatarIcon: {
        textAlign: 'center',
        alignSelf: 'center'
    },
    loginInputBox: {
        my: 8,
        mx: 4,
        paddingTop: '20%',
        paddingLeft: 10,
        paddingRight: 10,
        display: 'fixed',
        flexDirection: 'column',
    },
    formItemGrid: {
        width: '100%',
    }
}));
