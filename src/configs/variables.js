export const colors = {
    PRIMARY: '#3c6af5',
    SECONDARY: '#5b81f6',
    LIGHT_PRIMARY: '#e8eafe',
    BACKGROUND: '#eff0f4',
    BORDER_GREY: '#d4d5d9',
    TEXT: '#16171a',
    WHITE: '#fff',

    ERROR: '#e96e5e',
    LIGHT_ERROR: '#feedec',
    DARK_ERROR: '#d45842',
    GREY: '#9e9e9e',
    LIGHT_GREY: '#eee',
    GREEN: '#00ac82',
    LIGHT_GREEN: '#e1f5eb',
    DEFAULT: '#8f9094',
    DARK_DEFAULT: '#545558',
    DISABLED: '#f5f5f5',
    DARK_DISABLED: '#d4d5d9',

    CG900: '#16171a',
    CG800: '#36373a',
    CG700: '#545558',
    CG600: '#68686c',
    CG500: '#8f9094',
    CG400: '#b0b1b4',
    CG300: '#d4d5d9',
    CG200: '#e5e6ea',
    CG100: '#eff0f4',
    CG50: '#f7f8fc',
};

export const foundations = {
    elevation1: 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.05))',
    elevation2: 'drop-shadow(0px 8px 20px rgba(0, 0, 0, 0.2))',
};

export const assetsDir = {
    common: '/assets/common/',
    logo: '/assets/logo/',
    menuIcons: '/assets/menu-icons/',
    map: '/assets/map/',
    report: '/assets/report/',
};

export const sizes = {
    // DRAWER_WIDTH: 240,
    TABLE_DEFAULT_MIN_WIDTH: 1200,
    APPBAR_HEIGHT: 58,
};

export const WILLOG_INFO = {
    TEL: '02-6959-0966',
    TEL_GLOBAL: '82-2-6959-0966',
    URL: 'www.willog.io',
    ADDRESS_KO: '06150 서울특별시 강남구 선릉로 513, 8F 주식회사 윌로그',
    ADDRESS_EN: '06150 Willog Co., Ltd. 8F, Seolleung-ro, Gangnam-gu, Seoul, S.Korea',
};

export const GOOGLE_MAPS_KEY = 'AIzaSyBLkcUhkYO2sEx-wBh-C9XunxmrOfCmH5g';

export const hexToRgb = (input) => {
    input = input + '';
    input = input.replace('#', '');
    let hexRegex = /[0-9A-Fa-f]/g;
    if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
        throw new Error('input is not a valid hex color.');
    }
    if (input.length === 3) {
        let first = input[0];
        let second = input[1];
        let last = input[2];
        input = first + first + second + second + last + last;
    }
    input = input.toUpperCase();
    let first = input[0] + input[1];
    let second = input[2] + input[3];
    let last = input[4] + input[5];
    return parseInt(first, 16) + ', ' + parseInt(second, 16) + ', ' + parseInt(last, 16);
};

// ##############################
// // // Variables - Styles that are used on more than one component
// #############################

export const drawerWidth = 260;

export const transition = {
    transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
};

export const container = {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
};

export const defaultFont = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '300',
    lineHeight: '1.5em',
};

export const baseColor = '#3873cb';
export const primaryColor = ['#9c27b0', '#ab47bc', '#8e24aa', '#af2cc5'];
export const warningColor = ['#ff9800', '#ffa726', '#fb8c00', '#ffa21a'];
export const dangerColor = ['#f44336', '#ef5350', '#e53935', '#f55a4e'];
export const successColor = ['#4caf50', '#66bb6a', '#43a047', '#5cb860'];
export const basicColor = ['#FFFFFF', '#E5E5E5', '#C5C3C3', '#A2A1A1'];
export const infoColor = ['#00acc1', '#26c6da', '#00acc1', '#00d3ee'];
export const roseColor = ['#e91e63', '#ec407a', '#d81b60', '#eb3573'];
export const grayColor = [
    '#999',
    '#777',
    '#3C4858',
    '#AAAAAA',
    '#D2D2D2',
    '#DDD',
    '#b4b4b4',
    '#555555',
    '#333',
    '#a9afbb',
    '#eee',
    '#e7e7e7',
];
export const blackColor = '#000';
export const whiteColor = '#FFF';

export const boxShadow = {
    boxShadow:
        '0 10px 30px -12px rgba(' +
        hexToRgb(blackColor) +
        ', 0.42), 0 4px 25px 0px rgba(' +
        hexToRgb(blackColor) +
        ', 0.12), 0 8px 10px -5px rgba(' +
        hexToRgb(blackColor) +
        ', 0.2)',
};

export const primaryBoxShadow = {
    boxShadow:
        '0 4px 20px 0 rgba(' +
        hexToRgb(blackColor) +
        ',.14), 0 7px 10px -5px rgba(' +
        hexToRgb(primaryColor[0]) +
        ',.4)',
};
export const infoBoxShadow = {
    boxShadow:
        '0 4px 20px 0 rgba(' +
        hexToRgb(blackColor) +
        ',.14), 0 7px 10px -5px rgba(' +
        hexToRgb(infoColor[0]) +
        ',.4)',
};
export const basicBoxShadow = {
    boxShadow:
        '0 4px 20px 0 rgba(' +
        hexToRgb(blackColor) +
        ',.14), 0 7px 10px -5px rgba(' +
        hexToRgb(basicColor[0]) +
        ',.4)',
};
export const successBoxShadow = {
    boxShadow:
        '0 4px 20px 0 rgba(' +
        hexToRgb(blackColor) +
        ',.14), 0 7px 10px -5px rgba(' +
        hexToRgb(successColor[0]) +
        ',.4)',
};
export const warningBoxShadow = {
    boxShadow:
        '0 4px 20px 0 rgba(' +
        hexToRgb(blackColor) +
        ',.14), 0 7px 10px -5px rgba(' +
        hexToRgb(warningColor[0]) +
        ',.4)',
};
export const dangerBoxShadow = {
    boxShadow:
        '0 4px 20px 0 rgba(' +
        hexToRgb(blackColor) +
        ',.14), 0 7px 10px -5px rgba(' +
        hexToRgb(dangerColor[0]) +
        ',.4)',
};
export const roseBoxShadow = {
    boxShadow:
        '0 4px 20px 0 rgba(' +
        hexToRgb(blackColor) +
        ',.14), 0 7px 10px -5px rgba(' +
        hexToRgb(roseColor[0]) +
        ',.4)',
};

export const warningCardHeader = {
    background: 'linear-gradient(60deg, ' + warningColor[1] + ', ' + warningColor[2] + ')',
    ...warningBoxShadow,
};
export const basicCardHeader = {
    background: 'linear-gradient(60deg, ' + basicColor[1] + ', ' + basicColor[2] + ')',
    ...basicBoxShadow,
};
export const successCardHeader = {
    background: 'linear-gradient(60deg, ' + successColor[1] + ', ' + successColor[2] + ')',
    ...successBoxShadow,
};
export const dangerCardHeader = {
    background: 'linear-gradient(60deg, ' + dangerColor[1] + ', ' + dangerColor[2] + ')',
    ...dangerBoxShadow,
};
export const infoCardHeader = {
    background: 'linear-gradient(60deg, ' + infoColor[1] + ', ' + infoColor[2] + ')',
    ...infoBoxShadow,
};
export const primaryCardHeader = {
    background: 'linear-gradient(60deg, ' + primaryColor[1] + ', ' + primaryColor[2] + ')',
    ...primaryBoxShadow,
};
export const roseCardHeader = {
    background: 'linear-gradient(60deg, ' + roseColor[1] + ', ' + roseColor[2] + ')',
    ...roseBoxShadow,
};

export const cardActions = {
    margin: '0 20px 10px',
    paddingTop: '10px',
    borderTop: '1px solid ' + grayColor[10],
    height: 'auto',
    ...defaultFont,
};

export const cardHeader = {
    margin: '-20px 15px 0',
    borderRadius: '3px',
    padding: '15px',
};

export const card = {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    margin: '25px 0',
    boxShadow: '0 1px 4px 0 rgba(' + hexToRgb(blackColor) + ', 0.14)',
    borderRadius: '3px',
    color: 'rgba(' + hexToRgb(blackColor) + ', 0.87)',
    background: whiteColor,
};

export const defaultBoxShadow = {
    border: '0',
    borderRadius: '3px',
    boxShadow:
        '0 10px 20px -12px rgba(' +
        hexToRgb(blackColor) +
        ', 0.42), 0 3px 20px 0px rgba(' +
        hexToRgb(blackColor) +
        ', 0.12), 0 8px 10px -5px rgba(' +
        hexToRgb(blackColor) +
        ', 0.2)',
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
};

export const title = {
    color: grayColor[2],
    textDecoration: 'none',
    fontWeight: '300',
    marginTop: '30px',
    marginBottom: '25px',
    minHeight: '32px',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    '& small': {
        color: grayColor[1],
        fontWeight: '400',
        lineHeight: '1',
    },
};

export const cardTitle = {
    ...title,
    marginTop: '0',
    marginBottom: '3px',
    minHeight: 'auto',
    '& a': {
        ...title,
        marginTop: '.625rem',
        marginBottom: '0.75rem',
        minHeight: 'auto',
    },
};

export const cardSubtitle = {
    marginTop: '-.375rem',
};

export const cardLink = {
    '& + $cardLink': {
        marginLeft: '1.25rem',
    },
};
