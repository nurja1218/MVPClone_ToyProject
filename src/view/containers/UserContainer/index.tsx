// export default function UserContainer() {
//     return (
//         <div>유저 컨테이너</div>
//     );
// }

import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Orders from '../../components/Orders';
import { useQuery } from '@apollo/react-hooks';
import Box from '@mui/material/Box';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { TRANSPORTS_BY_COMPANY, TRANSPORT_HISTORY_IN_PRODUCT } from '../../../apollo/scripts/queries';
import { singleTransport, TableRowData, TableData, StatusCount } from '../../../types/interface'
import moment from 'moment';
import { Container, Typography } from '@mui/material';


const columns = [
    {
        title: 'No.',
        dataIndex: 'id',
    }, {
        title: '제품명',
        dataIndex: 'productName',
    }, {
        title: '출발지',
        dataIndex: 'departurePlaceName',
    }, {
        title: '출발시간',
        dataIndex: 'departureTime',
    }, {
        title: '도착시간',
        dataIndex: 'arrivalTime',
    }, {
        title: '제품상태',
        dataIndex: 'alarmRangeStatusId',
    }, {
        title: '배송상태',
        dataIndex: 'transportStatusId',
    }, {
        title: '출하증명상태',
        dataIndex: 'certificateStatusId',
    },
];

export default function UserContainer() {
    const initPage = 25;
    const [tableData, setTableData] = useState<TableData>({
        result: []
    });

    const getValue = (uuid: string) => {
        console.log(uuid);
    }

    const {
        data: transportData,
        error: transportError,
        // refetch,
    } = useQuery(TRANSPORTS_BY_COMPANY, {
        variables: {
            page: {
                pageNumber: 1,
                pageSize: 100,
            },
            search: {
                text: '',
                dateRange: {
                    from: '',
                    to: '',
                },
            },
        },
    });

    useEffect(() => {
        if (transportData) {
            const { transportsByCompany } = transportData;
            const { result, pages } = transportsByCompany;
            setTableData({
                result: result.map((row: TableRowData, idx: number) => ({
                    ...row,
                    id: idx + 1,
                    key: row.id,
                    productName: row.productName,
                    departurePlaceName: row.departurePlaceName,
                    departureTime: moment.unix(row.departureTime / 1000).local().format('YYYY-MM-DD HH:mm'),
                    arrivalTime: row.arrivalTime ? moment.unix(row.arrivalTime / 1000).local().format('YYYY-MM-DD HH:mm') : '-',
                    alarmRangeStatusId: row.alarmRangeStatusId === 'ABNORMAL' ? '비정상' : row.alarmRangeStatusId === 'NORMAL' ? '정상' : '미사용',
                    transportStatusId: row.transportStatusId === 'ARRIVE' ? '도착' : row.transportStatusId === 'INSPECT' ? '검수' : '출발',
                    certificateStatusId: row.certificateStatusId === 'NON_ISSUED' ? '불가' : row.certificateStatusId === 'ISSUED' ? '발급' : '미정',
                }))
            })
        }
    }, [transportData]);

    return (
        <Grid container spacing={3} >
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Orders columns={columns} data={tableData.result} getValue={getValue} initPage={initPage} />
                </Paper>
            </Grid>
        </Grid >
    );
}