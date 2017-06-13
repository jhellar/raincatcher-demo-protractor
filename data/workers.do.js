var params = {
  WORKER_TCREATE: 'wrk-crudl-create',
  WORKER_TUPDATE1: 'wrk-crudl-update-1',
  WORKER_TUPDATE2: 'wrk-crudl-update-2',
  WORKER_TCANCEL: 'wrk-crudl-cancel',
  WORKER_TDELETE: 'wrk-crudl-delete',
  WORKER_TSEARCH: 'wrk-crudl-search',
};

var workers = {
  CREATE: {
    name: params.WORKER_TCREATE,
    username: params.WORKER_TCREATE,
    password: '123',
    banner: 'http://' + params.WORKER_TCREATE + '.banners.com',
    avatar: 'http://' + params.WORKER_TCREATE + '.avatars.com',
    phonenumber: '777777777',
    email: params.WORKER_TCREATE + '@example.com',
    position: 'Driver1',
    group: 'Drivers'
  },
  UPDATE1: {
    name: params.WORKER_TUPDATE1,
    username: params.WORKER_TUPDATE1,
    password: '123',
    banner: 'http://' + params.WORKER_TUPDATE1 + '.banners.com',
    avatar: 'http://' + params.WORKER_TUPDATE1 + '.avatars.com',
    phonenumber: '777777777',
    email: params.WORKER_TUPDATE1 + '@example.com',
    position: 'Driver2',
    group: 'Drivers'
  },
  UPDATE2: {
    name: params.WORKER_TUPDATE2,
    username: params.WORKER_TUPDATE2,
    password: '123',
    banner: 'http://' + params.WORKER_TUPDATE2 + '.banners.com',
    avatar: 'http://' + params.WORKER_TUPDATE2 + '.avatars.com',
    phonenumber: '777777777',
    email: params.WORKER_TUPDATE2 + '@example.com',
    position: 'Driver3',
    group: 'Drivers'
  },
  DELETE: {
    name: params.WORKER_TDELETE,
    username: params.WORKER_TDELETE,
    password: '123',
    banner: 'http://' + params.WORKER_TDELETE + '.banners.com',
    avatar: 'http://' + params.WORKER_TDELETE + '.avatars.com',
    phonenumber: '777777777',
    email: params.WORKER_TDELETE + '@example.com',
    position: 'Driver4',
    group: 'Drivers'
  },
  CANCEL: {
    name: params.WORKER_TCANCEL,
    username: params.WORKER_TCANCEL,
    password: '123',
    banner: 'http://' + params.WORKER_TCANCEL + '.banners.com',
    avatar: 'http://' + params.WORKER_TCANCEL + '.avatars.com',
    phonenumber: '777777777',
    email: params.WORKER_TCANCEL + '@example.com',
    position: 'Driver5',
    group: 'Drivers'
  },
  SEARCH: {
    name: params.WORKER_TSEARCH,
    username: params.WORKER_TSEARCH,
    password: '123',
    banner: 'http://' + params.WORKER_TSEARCH + '.banners.com',
    avatar: 'http://' + params.WORKER_TSEARCH + '.avatars.com',
    phonenumber: '777777777',
    email: params.WORKER_TSEARCH + '@example.com',
    position: 'Driver6',
    group: 'Drivers'
  }
};

module.exports = {
  params,
  workers
};