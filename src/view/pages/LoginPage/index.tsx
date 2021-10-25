import React, { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useStyles } from './style';
import { useApolloClient, useLazyQuery } from '@apollo/react-hooks';
import { LOGIN } from '../../../apollo/scripts/queries';
import { useSetRecoilState } from 'recoil';
import { loginHandler } from '../../../recoil/selectors';

interface User {
  email: string;
  password: string;
}

export default function SignInSide() {
  const classes = useStyles();
  const [login, { data, error }] = useLazyQuery(LOGIN);
  const [form] = Form.useForm();
  const client = useApolloClient();
  const setAfterLogin = useSetRecoilState(loginHandler);

  useEffect(() => {
    if (data) {
      client.cache.reset().then(() => {
        setAfterLogin(data.login);
      });
    }
    if (error) {
      if (error.message.includes('PERMISSION')) {
        message.error('권한이 없는 계정입니다.');
      } else {
        message.error('이메일 또는 비밀번호를 다시 확인하세요.');
      }
    }
  }, [data, error, client.cache, setAfterLogin])

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  const handleSubmit = (user: User) => {
    login({
      variables: {
        user
      },
    });
  };

  const handleFail = ({ errorFields }: any) => {
    if (errorFields[0].name[0] === 'email') {
      message.error('이메일을 입력하세요.');
      return;
    }
    if (errorFields[0].name[0] === 'password') {
      message.error('비밀번호를 입력하세요.');
      return;
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        className={classes.imageGrid}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box className={classes.loginInputBox}>
          <Grid className={classes.avatarIcon}>
            <Avatar sx={{ m: 1, bgcolor: 'blue' }} >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

          </Grid>
          {/*  */}
          <Form onFinish={handleSubmit} form={form} onFinishFailed={handleFail} >
            {/* <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}> */}
            <Grid sx={{ mt: 1 }} className={classes.formItemGrid}>
              <Form.Item name="email" rules={[{ required: true }]} noStyle>
                <Input size="large" placeholder={'이메일'} />
              </Form.Item>
            </Grid>
            <Grid sx={{ mt: 1 }} className={classes.formItemGrid}>
              <Form.Item name="password" rules={[{ required: true }]} noStyle>
                <Input.Password size="large" placeholder={'비밀번호'} />
              </Form.Item>
            </Grid>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {/* </Box> */}
          </Form>
          {/*  */}
        </Box>
      </Grid>
    </Grid>
  );
}
