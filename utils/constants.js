module.exports = {
  auth: {
    DEFAULT_PASSWORD: '123',
    INVALID_PASSWORD: 'xxx',
    NEW_PASSWORD: '12345',
    usernames: {
      TREVER_SMITH: 'trever',
      DAISY_DIALER: 'daisy',
      MAX_A_MILLION: 'max',
      PHYLIS_LEXY: 'phylis',
      JOHNNY_FIZAL: 'johnny',
      BILLY_BALLER: 'billy',
      SALLY_SHORER: 'sally',
      DANNY_DOORMAN: 'danny',
      INVALID_USER: 'invalid'
    },
    userFullName: {
      TREVER: 'Trever Smith',
      DAISY: 'Daisy Dialer'
    }
  },
  HASH: '#',
  login: {
    URL: '/login',
    DEFAULT_HEADING: 'FeedHenry WFM Demo',
    DEFAULT_BODY: 'Trouble logging in? Contact the switchboard.',
    AUTH_FAIL_MSG: 'Authentication Failed! Try Again. (Error: User not found with supplied credentials)',
    VALUE_ATTRIBUTE: 'value',
    USERNAME_MISSING_MSG: 'A username is required.',
    PASSWORD_MISSING_MSG: 'A password is required.'
  },
  logout: {
    URL: '/login',
    DEFAULT_BODY: 'Trouble logging in? Contact the switchboard.'
  },
  schedule: {
    URL: '/schedule',
    schedulerCalendarButton: {
      TRIANGLE: 'triangle',
      ICON: 'icon'
    }
  },
  groups: {
    URL: '/groups',
    URL_NEW: '/groups/new',
    DEFAULT_HEADING: "No group selected.",
    DEFAULT_BODY: "Select a group from the menu, or create a new group:"
  },
  workers: {
    URL: '/workers',
    URL_NEW:'/workers/new',
    DEFAULT_HEADING: "No worker selected.",
    DEFAULT_BODY: "Select a worker from the menu, or create a new worker:"
  },
  workflows: {
    URL: '/workflows/list',
    URL_NEW: '/workflows/list/workflows/',
    DEFAULT_HEADING: "No workflow selected.",
    // DEFAULT_BODY: "Select a workflow from the menu, or create a new workflow:"
    DEFAULT_BODY: "Select a workflow from the menu."
  },
  workorders: {
    URL: '/workorders/list',
    URL_NEW: '/workorders/list/new',
    DEFAULT_HEADING: "No workorder selected.",
    DEFAULT_BODY: "Select a workorder from the menu, or create a new workorder:"
  },
  files: {
    URL: '/files',
    URL_DETAIL: '/files/detail/'
  },
  dateFormat: {
    BIG_ENDIAN: "big-endian", // date format - 2017/01/21
    LITTLE_ENDIAN: "little-endian", // date format - 01/21/2017
    MIDDLE_ENDIAN: "middle-endian" // date format - 21/01/2017
  },
  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthsAbbreviations: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
};
