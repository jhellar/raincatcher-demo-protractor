var params = {
  GROUP_TCREATE: 'grp-crudl-create',
  GROUP_TUPDATE1: 'grp-crudl-update-1',
  GROUP_TUPDATE2: 'grp-crudl-update-2',
  GROUP_TCANCEL: 'grp-crudl-cancel',
  GROUP_TDELETE: 'grp-crudl-delete',
  GROUP_TSEARCH: 'grp-crudl-search',
  GROUP_TADD: 'grp-member-add-to',
  WORKER_TADD: 'grp-member-in-group'
};

var groups = {
  CREATE: {
    name: params.GROUP_TCREATE,
    role: 'Admin'
  },
  UPDATE1: {
    name: params.GROUP_TUPDATE1,
    role: 'Manager'
  },
  UPDATE2: {
    name: params.GROUP_TUPDATE2,
    role: 'Worker'
  },
  DELETE: {
    name: params.GROUP_TDELETE,
    role: 'Admin'
  },
  CANCEL: {
    name: params.GROUP_TCANCEL,
    role: 'Manager'
  },
  SEARCH: {
    name: params.GROUP_TSEARCH,
    role: 'Worker'
  },
  ADD: {
    name: params.GROUP_TADD,
    role: 'Worker'
  }
};

var workers = {
  ADD: {
    name: params.WORKER_TADD,
    username: params.WORKER_TADD,
    password: '123',
    banner: 'http://' + params.WORKER_TADD + '.banners.com',
    avatar: 'http://' + params.WORKER_TADD + '.avatars.com',
    phonenumber: '777777777',
    email: params.WORKER_TADD + '@example.com',
    position: 'Driver In Group',
    group: params.GROUP_TADD
  }
};

module.exports = {
  params, groups, workers
};