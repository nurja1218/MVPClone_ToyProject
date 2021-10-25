import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../Title';
import moment from 'moment';

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

export default function Deposits(props: any) {
    const today = moment().local().format('YYYY/MM/DD dddd');
    const { data } = props;
    return (
        <React.Fragment>
            <Title>배송 상태</Title>
            <Typography component="p" variant="h5">
                배송중 : <strong>{data.inTransit}</strong><br />
                정상 : <strong>{data.normal}</strong><br />
                비정상 : <strong>{data.abnormal}</strong>
            </Typography>
            <br />
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {today}
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    배송 상태 확인
                </Link>
            </div>
        </React.Fragment>
    );
}