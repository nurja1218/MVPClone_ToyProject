import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../../components/Chart';
import Deposits from '../../components/Deposits';
import Orders from '../../components/Orders';
import { useQuery } from '@apollo/react-hooks';
import { TRANSPORTS_BY_COMPANY, TRANSPORT_HISTORY_IN_PRODUCT } from '../../../apollo/scripts/queries';
import { singleTransport, TableRowData, TableData, StatusCount } from '../../../types/interface'
import moment from 'moment';

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

export default function MainContainer() {
    const initPage = 10;
    const [tableData, setTableData] = useState<TableData>({
        result: []
    });
    const [transportStatus, setTransportStatus] = useState<StatusCount>({
        inTransit: 0,
        normal: 0,
        abnormal: 0,
    })
    const [transportId, setTransportId] = useState<string>('');
    const [chartData, setChartData] = useState<singleTransport>();

    const getValue = (uuid: string) => {
        setTransportId(uuid);
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

    const {
        data: controlDetailData,
        error: controlDetailError,
        // refetch,
    } = useQuery(TRANSPORT_HISTORY_IN_PRODUCT, {
        variables: {
            uuid: transportId,
        },
    });

    useEffect(() => {
        if (transportData) {
            const { transportsByCompany } = transportData;
            const { result, pages } = transportsByCompany;
            setTransportStatus({
                inTransit: result.filter((row: TableRowData) => row.transportStatusId !== 'ARRIVE').length,
                normal: result.filter((row: TableRowData) => row.alarmRangeStatusId === 'NORMAL').length,
                abnormal: result.filter((row: TableRowData) => row.alarmRangeStatusId === 'ABNORMAL').length,
            })
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
            setTransportId(result[0].id)
        }
    }, [transportData]);

    useEffect(() => {
        if (controlDetailData) {
            const { transportHistoryInProduct } = controlDetailData;
            setChartData(transportHistoryInProduct);
        }
    }, [controlDetailData]);

    return (
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} lg={9}>
                <Paper
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 260,
                    }}
                >
                    <Chart data={chartData} />
                </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 260,
                    }}
                >
                    <Deposits data={transportStatus} />
                </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Orders columns={columns} data={tableData.result} getValue={getValue} initPage={initPage} />
                </Paper>
            </Grid>
        </Grid>
    );
}