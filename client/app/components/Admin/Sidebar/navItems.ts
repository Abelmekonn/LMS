// navItems.ts
import { HomeOutlined as HomeOutlinedIcon } from '@mui/icons-material';
import { FaUsers } from "react-icons/fa";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { Create as CreateIcon } from '@mui/icons-material';
import { LiveTv as LiveTvIcon } from '@mui/icons-material';
import { Analytics as AnalyticsIcon } from '@mui/icons-material';
import { TbReportAnalytics } from "react-icons/tb";
import { LiaPagerSolid } from "react-icons/lia";
import { Category as CategoryIcon } from '@mui/icons-material';
import { People as PeopleIcon } from '@mui/icons-material';
import { Settings as SettingsIcon, Quiz as QuizIcon } from '@mui/icons-material';
import { Logout as LogoutIcon } from '@mui/icons-material';

export const navItems = (logoutHandler: () => void) => [
    { name: 'Dashboard', href: '/admin', icon: HomeOutlinedIcon },
    { name: 'Users', href: '/admin/users', icon: FaUsers },
    { name: 'Invoice', href: '/admin/invoice', icon: LiaFileInvoiceSolid },
    { name: 'Create Course', href: '/admin/create-course', icon: CreateIcon },
    { name: 'Live Courses', href: '/admin/courses', icon: LiveTvIcon },
    { name: 'Course Analytics', href: '/admin/course-analytics', icon: AnalyticsIcon },
    { name: 'User Analytics', href: '/admin/user-analytics', icon: TbReportAnalytics },
    { name: 'Order Analytics', href: '/admin/order-analytics', icon: AnalyticsIcon },
    { name: 'Hero', href: '/admin/hero', icon: LiaPagerSolid },
    { name: 'FAQ', href: '/admin/faq', icon: QuizIcon },
    { name: 'Categories', href: '/admin/categories', icon: CategoryIcon },
    { name: 'Manage Team', href: '/admin/team', icon: PeopleIcon },
    { name: 'Settings', href: '/admin/settings', icon: SettingsIcon },
    { name: 'Logout', href: '#', icon: LogoutIcon, onClick: logoutHandler },
];
