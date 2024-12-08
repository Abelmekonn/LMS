import React from 'react';
import AdminLayout from '../../../app/components/Admin/adminLayout/AdminLayout';
import AdminProtected from '../../../app/hooks/adminProtected';
import Heading from '../../../app/utils/Heading';
import UserAnalytics from '@/app/components/Admin/Analytics/UserAnalytics';
type Props = {};

const Page = (props: Props) => {
    return (
        <div>
            <AdminProtected>
                <Heading
                    title="ELearning - Admin"
                    description="Learning platform"
                    keywords="ELearning, education"
                />
                <AdminLayout>
                    <UserAnalytics isDashboard={false} />
                </AdminLayout>
            </AdminProtected>
        </div>
    );
};

export default Page;
