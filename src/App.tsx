import { BrowserRouter as Router } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenState, currentMenuState, clientTypeState, langState } from './recoil/atoms';
import { loginHandler, logoutHandler } from './recoil/selectors';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import createClient from './apollo/clients/hybrid.client';
import { ApolloProvider } from '@apollo/react-hooks';
import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import Title from './view/components/Title';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MainListItems from './view/components/listItems';
/**
 * UTC Timezone set
 */
import './configs/locale.utc';

/**
 * Apollo Client
 */

/**
 * Routes
 */
import { RoutesForNewUser, RoutesForCompanyUser } from './routes';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://willog.io/">
                Willog
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

export default function App() {
    const clientType = useRecoilValue(clientTypeState);
    const accessToken = useRecoilValue(accessTokenState);
    const logout = useSetRecoilState(logoutHandler);
    return (
        <ApolloProvider client={createClient(clientType, accessToken, logout)}>
            {/* <TokenLoader> */}
            <Routers />
            {/* </TokenLoader> */}
        </ApolloProvider>
    );
}

function Routers() {
    const currentPage = window.location.href.split('/').reverse()[0];
    const clientType = useRecoilValue(clientTypeState);
    // const currentMenu = useRecoilValue(currentMenuState);
    const [open, setOpen] = useState(true);
    const [title, setTitle] = useState<string>('');

    const [currentContainer, setcCurrentContainer] = useState('Main');

    console.log('원래?')

    const getValue = (name: string) => {
        setcCurrentContainer(name);
    }

    // console.log(currentMenu)

    useEffect(() => {
        console.log(currentContainer)
        if (currentContainer === 'Main') {
            setTitle('');
        } else if (currentContainer === 'Control') {
            setTitle('관리 페이지');
        } else if (currentContainer === 'User') {
            setTitle('사용자 목록');
        }
    }, [currentContainer])

    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
        <Router>
            <CssBaseline />

            {clientType === 'guest' && <RoutesForNewUser />}
            {clientType === 'company' && (
                // <RoutesForCompanyUser />
                <ThemeProvider theme={mdTheme}>
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        {/*  */}
                        <AppBar position="absolute" open={open}>
                            <Toolbar
                                sx={{
                                    pr: '24px', // keep right padding when drawer closed
                                }}
                                style={{ background: '#3c6af5' }}
                            >
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={toggleDrawer}
                                    sx={{
                                        marginRight: '36px',
                                        ...(open && { display: 'none' }),
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography
                                    component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    sx={{ flexGrow: 1 }}
                                >
                                    {currentContainer}
                                </Typography>
                                <IconButton color="inherit">
                                    <Badge badgeContent={4} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <Drawer variant="permanent" open={open}>
                            <Toolbar
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    px: [1],
                                }}
                            >
                                <IconButton onClick={toggleDrawer}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </Toolbar>
                            <Divider />
                            <List><MainListItems getValue={getValue} /></List>
                        </Drawer>
                        {/*  */}

                        {/* --------------------------------------------------------------- */}
                        <ThemeProvider theme={mdTheme}>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                <CssBaseline />
                                <Box
                                    component="main"
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[100]
                                                : theme.palette.grey[900],
                                        // flexGrow: 1,
                                        flex: 1,
                                        height: '100vh',
                                        // width: '100vw',
                                        overflow: 'auto',
                                    }}
                                >
                                    <Toolbar />
                                    <Container maxWidth={false} sx={{ mt: 3, mb: 2 }}><Title>{title}</Title>
                                        <RoutesForCompanyUser />
                                        <Copyright sx={{ pt: 4 }} />
                                    </Container>
                                </Box>
                            </Box>
                        </ThemeProvider>
                        {/* --------------------------------------------------------------- */}
                    </Box>
                </ThemeProvider>
            )}
        </Router>
    );
}
