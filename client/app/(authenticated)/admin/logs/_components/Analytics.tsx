import { useFetchCourseAnalyticsQuery, useFetchOrderAnalyticsQuery, useFetchUserAnalyticsQuery } from '@/redux/features/analytics/analtics.api';
import { Box, CircularProgress } from '@mui/material';
import React from 'react'
import { BiBorderLeft } from 'react-icons/bi';
import { PiUsersFourLight } from 'react-icons/pi';
import { AreaChart, Bar, BarChart, Label, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, LineChart, Line } from 'recharts';

const Analytics = () => {
    const { data: coursesData } = useFetchCourseAnalyticsQuery();
    const { data: usersData } = useFetchUserAnalyticsQuery();
    const { data: ordersData } = useFetchOrderAnalyticsQuery();

    const demoAnalyticsData = [
        { name: 'Jun 2023', uv: 3000 },
        { name: 'Jul 2023', uv: 2000 },
        { name: 'Aug 2023', uv: 5000 },
        { name: 'Sep 2023', uv: 7000 },
        { name: 'Oct 2023', uv: 2000 },
        { name: 'Nov 2023', uv: 5000 },
        { name: 'Dec 2023', uv: 7000 },
    ]

    const coursesAnalyticsData = React.useMemo(() => {
        if (!coursesData) {
            return [];
        }
        return coursesData.courses.lastYearData.map((curr) => ({ name: curr.month, uv: curr.count }));
    }, [coursesData]);

    const usersAnalyticsData = React.useMemo(() => {
        if (!usersData) {
            return [];
        }
        return usersData.users.lastYearData.map((curr) => ({ name: curr.month, uv: curr.count }));
    }, [usersData]);

    const ordersAnalyticsData = React.useMemo(() => {
        if (!ordersData) {
            return [];
        }
        return ordersData.orders.lastYearData.map((curr) => ({ name: curr.month, uv: curr.count }));
    }, [ordersData]);

    const minValue = 0;

    return (
        <div className='w-full h-full flex flex-col items-center justify-center gap-8'>
            <div className='flex flex-col sm:flex-row items-center justify-center w-full gap-8'>
                <div className='bg-slate-50 dark:bg-slate-900 w-full flex items-center justify-between max-w-96 shadow-2xl rounded-lg py-4 px-8'>
                    <div className='flex flex-col'>
                        <BiBorderLeft size={40} className='text-orange-500' />
                        <p className='flex text-lg'>100</p>
                        <p className='text-lg text-orange-500'>Total Sales</p>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <CircularProgress
                            variant='determinate'
                            value={100}
                            size={50}
                            color='primary'
                            thickness={4}
                        />
                        <p className='text-lg'>+100%</p>
                    </div>
                </div>

                <div className='bg-slate-50 dark:bg-slate-900 w-full flex items-center justify-between max-w-96 shadow-2xl rounded-lg py-4 px-8'>
                    <div className='flex flex-col'>
                        <PiUsersFourLight size={40} className='text-orange-500' />
                        <p className='flex text-lg'>400</p>
                        <p className='text-lg text-orange-500'>New Users</p>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <CircularProgress
                            variant='determinate'
                            value={100}
                            size={50}
                            color='primary'
                            thickness={4}
                        />
                        <p className='text-lg'>+80%</p>
                    </div>
                </div>
            </div>

            <div className='w-full bg-slate-50 dark:bg-slate-900 shadow-2xl rounded-lg'>
                <p className='text-lg text-center py-2'>Courses Logs</p>
                <hr className="h-px bg-orange-500 border-0 dark:bg-orange-500 " />
                <div className='w-full h-[300px] flex items-center justify-center pl-4 pr-8'>
                    <ResponsiveContainer width='100%' height='50%' >
                        <BarChart height={200} width={400} data={coursesAnalyticsData}>
                            <XAxis dataKey='name'>
                                <Label offset={0} position='insideBottom' />
                            </XAxis>
                            <YAxis domain={[minValue, 'auto']} />
                            <Bar dataKey='uv' fill='#f97316'>
                                <LabelList dataKey='uv' position='top' />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className='w-full bg-slate-50 dark:bg-slate-900 shadow-2xl rounded-lg'>
                <p className='text-lg text-center py-2'>Users Logs</p>
                <hr className="h-px bg-orange-500 border-0 dark:bg-orange-500 " />
                <div className='w-full h-[300px] flex items-center justify-center pl-4 pr-8'>
                    <ResponsiveContainer width='100%' height='50%'>
                        <AreaChart data={usersAnalyticsData}>
                            <XAxis dataKey='name' />
                            <YAxis />
                            <Tooltip />
                            <Area dataKey='uv' type='monotone' stroke='#f97316' fill='#f97316' />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className='w-full bg-slate-50 dark:bg-slate-900 shadow-2xl rounded-lg'>
                <p className='text-lg text-center py-2'>Orders Logs</p>
                <hr className="h-px bg-orange-500 border-0 dark:bg-orange-500 " />
                <div className='w-full h-[300px] flex items-center justify-center pl-4 pr-8'>
                    <ResponsiveContainer width='100%' height='50%'>
                        <LineChart data={ordersAnalyticsData}>
                            <XAxis dataKey='name' />
                            <YAxis />
                            <Tooltip />
                            <Line dataKey='uv' type='monotone' stroke='#f97316' fill='#f97316' />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default Analytics;