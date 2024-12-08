import React from 'react'
import DashboardWidgets from '../Widgets/DashboardWidgets';

type Props = {
    isDashboard?: boolean;
}

const DashboardHero = ({ isDashboard }: Props) => {
    return (
        <>
            {
                isDashboard && (
                    <DashboardWidgets open={open} />
                )
            }
        </>
    )
}

export default DashboardHero