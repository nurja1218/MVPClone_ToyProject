import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Orders from '../../components/Orders';
// ---------------------------------------------------------------
import AccessTime from "@material-ui/icons/AccessTime";
import Card from '../../components/Card';
import CardHeader from '../../components/CardHeader';
import CardBody from '../../components/CardBody';
import CardFooter from '../../components/CardFooter';
import Table from '../../components/Table';
import GridContainer from '../../components/GridContainer';
import ChartistGraph from "react-chartist";
import { makeStyles } from "@material-ui/core/styles";
import { useStyles } from "./style";
// import { chartData } from "./charts";
import { chartOption } from "./charts";
// ---------------------------------------------------------------
import { useQuery } from '@apollo/react-hooks';
import Box from '@mui/material/Box';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { TRANSPORTS_BY_COMPANY, TRANSPORT_HISTORY_IN_PRODUCT } from '../../../apollo/scripts/queries';
import { singleTransport, TableRowData, TableData, StatusCount } from '../../../types/interface'
import moment from 'moment';
import ArrowUpward from "@material-ui/icons/ArrowUpward";
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

const mdTheme = createTheme();
// const useStyles = makeStyles(styles.dashboardStyle);

export default function ControlContainer() {
    const initPage = 25;
    const { lineChart, barChart, pieChart } = chartOption({ data: 'data' });

    const classes = useStyles();
    const [tableData, setTableData] = useState<TableData>({
        result: []
    });

    // const getValue = (uuid: string) => {
    //     console.log(uuid);
    // }

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
    console.log(tableData);

    return (
        <Grid container spacing={3} >
            <CssBaseline />
            <Grid item xs={12} sm={12} md={4}>
                <Card chart>
                    <CardHeader color="basic" data-id="transport">
                        <ChartistGraph
                            // className="ct-chart"
                            className={classes.graphStyle}
                            data={lineChart.data}
                            type="Line"
                            options={lineChart.options}
                            listener={lineChart.animation}
                        />
                    </CardHeader>
                    <CardBody>
                        <h4 className={classes.cardTitle}>Daily Sales</h4>
                        <p className={classes.cardCategory}>
                            <span className={classes.successText}>
                                <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                            </span>{" "}
                            increase in today sales.
                        </p>
                    </CardBody>
                    <CardFooter chart>
                        <div className={classes.stats}>
                            <AccessTime /> updated 4 minutes ago
                        </div>
                    </CardFooter>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <Card chart>
                    <CardHeader color="basic" data-id="destination">
                        <ChartistGraph
                            className={classes.graphStyle}
                            data={barChart.data}
                            type="Bar"
                            options={barChart.options}
                            responsiveOptions={barChart.responsiveOptions}
                            listener={barChart.animation}
                        />
                    </CardHeader>
                    <CardBody>
                        <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                        <p className={classes.cardCategory}>Last Campaign Performance</p>
                    </CardBody>
                    <CardFooter chart>
                        <div className={classes.stats}>
                            <AccessTime /> campaign sent 2 days ago
                        </div>
                    </CardFooter>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <Card chart>
                    <CardHeader color="basic" data-id="destination">
                        <ChartistGraph
                            className={classes.graphStyle}
                            data={lineChart.data}
                            type="Line"
                            options={lineChart.options}
                            listener={lineChart.animation}
                        />
                    </CardHeader>
                    <CardBody>
                        <h4 className={classes.cardTitle}>Completed Tasks</h4>
                        <p className={classes.cardCategory}>Last Campaign Performance</p>
                    </CardBody>
                    <CardFooter chart>
                        <div className={classes.stats}>
                            <AccessTime /> campaign sent 2 days ago
                        </div>
                    </CardFooter>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <Card chart>
                    <CardHeader color="basic" data-id="transport">
                        <ChartistGraph
                            // className="ct-chart"
                            className={classes.graphStyle}
                            data={lineChart.data}
                            type="Line"
                            options={lineChart.options}
                            listener={lineChart.animation}
                        />
                    </CardHeader>
                    <CardBody>
                        <h4 className={classes.cardTitle}>Daily Sales</h4>
                        <p className={classes.cardCategory}>
                            <span className={classes.successText}>
                                <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                            </span>{" "}
                            increase in today sales.
                        </p>
                    </CardBody>
                    <CardFooter chart>
                        <div className={classes.stats}>
                            <AccessTime /> updated 4 minutes ago
                        </div>
                    </CardFooter>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <Card>
                    <CardHeader color="basic">
                        <h4 className={classes.cardTitleBasic}>Employees Stats</h4>
                        <p className={classes.cardCategoryBasic}>
                            New employees on 15th September, 2016
                        </p>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="basic"
                            tableHead={["ID", "Name", "Salary", "Country"]}
                            tableData={[
                                ["1", "Dakota Rice", "$36,738", "Niger"],
                                ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                                ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                            ]}
                        />
                    </CardBody>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <Card chart>
                    <CardHeader color="basic" data-id="destination">
                        <ChartistGraph
                            className={classes.graphStyle}
                            data={pieChart.data}
                            type="Pie"
                            options={pieChart.options}
                        // responsiveOptions={pieChart.responsiveOptions}
                        // listener={pieChart.animation}
                        />
                    </CardHeader>
                    <CardBody>
                        <h4 className={classes.cardTitle}>Completed Tasks</h4>
                        <p className={classes.cardCategory}>Last Campaign Performance</p>
                    </CardBody>
                    <CardFooter chart>
                        <div className={classes.stats}>
                            <AccessTime /> campaign sent 2 days ago
                        </div>
                    </CardFooter>
                </Card>
            </Grid>
        </Grid>
    );
}