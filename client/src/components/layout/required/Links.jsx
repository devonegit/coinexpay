import { MdDashboard, MdLock, MdPeople, MdMessage } from 'react-icons/md';


const Links = [
    { icon: <MdDashboard className="w-5 h-5" />, text: 'Dashboard', path: '/dashboard', dropdown: false, roles: ['user', 'admin'] },
    {
      icon: <MdLock className="w-5 h-5" />,
      text: 'Earn',
    //   path: '#',
      dropdown: true,
      roles: ['user'],
      subLinks: [
        { text: 'Manual Faucet', path: '/dashboard/manual-faucet', roles: ['user'] },
        { text: 'Auto Faucet', path: '/dashboard/auto-faucet', roles: ['user'] },
        { text: 'Shortlinks', path: '/dashboard/short-links', roles: ['user'] },
        { text: 'PTC', path: '/dashboard/ptc', roles: ['user'] }
      ]
    },
    { icon: <MdMessage className="w-5 h-5" />, text: 'Daily Tasks', path: '/dashboard/daily-tasks', dropdown: false, roles: ['user'] },
    { icon: <MdPeople className="w-5 h-5" />, text: 'Refer and earn', path: '/dashboard/affiliate', dropdown: false, roles: ['user'] },
    {
      icon: <MdLock className="w-5 h-5" />,
      text: 'Withdraw',
    //   path: '#',
      dropdown: true,
      roles: ['user'],
      subLinks: [
        { text: 'Create Request', path: '/dashboard/withdraw/create', roles: ['user'] },
        { text: 'Transaction History', path: '/dashboard/withdraw/history', roles: ['user'] }
      ]
    },
    { icon: <MdPeople className="w-5 h-5" />, text: 'Support', path: '/dashboard/support', dropdown: false, roles: ['user'] },
    { icon: <MdPeople className="w-5 h-5" />, text: 'FAQ', path: '/dashboard/frequently-asked-questions', dropdown: false, roles: ['user'] },




    //admin routes
    // { icon: <MdLock className="w-5 h-5" />, text: 'Manage Cryptocoins', path: '/dashboard/coin-details', dropdown: false, roles: ['admin'] },

    //admin routes
    {
        icon: <MdLock className="w-5 h-5" />,
        text: 'Settings',
        // path: '#',
        dropdown: true,
        roles: ['admin'],
        subLinks: [
          { text: 'Manage Cryptocoins', path: '/dashboard/coin-details', roles: ['admin'] },
          { text: 'Manage Tasks', path: '/dashboard/task-details', roles: ['admin'] },
        ]
      },

      { icon: <MdPeople className="w-5 h-5" />, text: 'Support', path: '/dashboard/admin-support', dropdown: false, roles: ['admin'] },
      { icon: <MdPeople className="w-5 h-5" />, text: 'Claims', path: '/dashboard/admin-claims', dropdown: false, roles: ['admin'] },
      { icon: <MdPeople className="w-5 h-5" />, text: 'Users', path: '/dashboard/admin-users', dropdown: false, roles: ['admin'] },
      { icon: <MdPeople className="w-5 h-5" />, text: 'Withdrawals', path: '/dashboard/admin-withdrawals', dropdown: false, roles: ['admin'] },
      
  ];
  
  export default Links;