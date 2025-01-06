import React from 'react'
import DashboardWidgets from '../Widgets/DashboardWidgets';

type Props = {
    isDashboard?: boolean;
}

const DashboardHero = ({ isDashboard }: Props) => {
    const [open, setOpen] = React.useState(false);

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