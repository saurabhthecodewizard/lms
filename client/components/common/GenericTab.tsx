'use client'
import React from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Tabs } from "@mui/material";

export function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export interface TabProps {
    label: string;
    node: React.ReactNode;
}

interface GenericTabProps {
    items: TabProps[];
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 2 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const GenericTab: React.FC<GenericTabProps> = (props) => {
    const { items } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = React.useCallback((_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {items.map((item, index) => (
                        <Tab key={index} label={item.label} className="text-orange-500" {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Box>
            {items.map((item, index) => (
                <TabPanel key={index} value={value} index={index}>
                    {item.node}
                </TabPanel>
            ))}
        </Box>
    );

}

export default GenericTab;