import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../Title';
import moment from 'moment';

// Generate Sales Data
function createData(time: string, temperature?: number) {
    return { time, temperature };
}

export default function Chart(props: any) {
    const { data } = props;
    const [graphData, setGraphData] = useState({
        gdata: []
    });
    const theme = useTheme();

    useEffect(() => {
        if (data !== undefined && Object.keys(data).length !== 0) {
            const { temperature, indexTime, interval } = data;
            setGraphData({
                gdata: temperature.map((value: number, idx: number) => (
                    createData(moment(indexTime).add(idx * interval, 's').local().format('YYYY-MM-DD HH:mm'), value))),
            });
        }
    }, [data])

    return (
        <React.Fragment>
            <Title>{graphData.gdata.length !== 0 && data.productName}</Title>
            <ResponsiveContainer>
                <LineChart
                    data={graphData.gdata}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis
                        dataKey="time"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: 'middle',
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}
                        >
                            Temperature (℃)
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="temperature"
                        stroke={theme.palette.primary.main}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}