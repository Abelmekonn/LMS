import React, { FC, ReactElement } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface BoxesProps {
    title: string;
    value: string | number;
    icon: ReactElement;
}

const Boxes: FC<BoxesProps> = ({ title, value, icon }) => {
    return (
        <Card className='dark:bg-[#4d5664] md:w-10 w-8 mb-5 dark:text-white' sx={{ display: 'flex', alignItems: 'center', p: 2, boxShadow: 3, borderRadius: 2, minWidth: 275 }}>
            {/* Text */}
            <CardContent>
                <Typography variant="h6" component="div">
                    {title}
                </Typography>
                <Typography variant='h4' className='text-black dark:text-white '>
                    {value}
                </Typography>
            </CardContent>
            {/* Icon */}
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'green.100',
                    borderRadius: '50%'
                }}
            >
                {icon}
            </Box>
        </Card>
    );
};

export default Boxes;
