var params = {
  STEP_TCREATE: 'create-stp-crudl',
  STEP_TUPDATE1: 'update1-stp-crudl',
  STEP_TUPDATE2: 'update2-stp-crudl',
  STEP_TDELETE: 'delete-stp-crudl',
  STEP_TCANCEL: 'cancel-stp-crudl',
  WORKFLOW_TCRUDL: 'addto-wfw-steps'
};

var steps = {
  CREATE: {
    code: 'stp-crudl-create',
    name: params.STEP_TCREATE,
    formId: 'Create Form ID',
    form: 'Create Form',
    view: 'Create View'
  },
  UPDATE1: {
    code: params.STEP_TUPDATE1,
    name: 'stp-crudl-update-1',
    formId: 'Update Form ID1',
    form: 'Update Form1',
    view: 'Update View1'
  },
  UPDATE2: {
    code: params.STEP_TUPDATE2,
    name: 'stp-crudl-update-2',
    formId: 'Update Form ID2',
    form: 'Update Form2',
    view: 'Update View2'
  },
  DELETE: {
    code: 'stp-crudl-delete',
    name: params.STEP_TDELETE,
    formId: 'Delete Form ID',
    form: 'Delete Form',
    view: 'Delete View'
  },
  CANCEL: {
    code: 'stp-crudl-cancel',
    name: params.STEP_TCANCEL,
    formId: 'Cancel Form ID',
    form: 'Cancel Form',
    view: 'Cancel View'
  }
};

var workflows = {
  WORKFLOW: {
    title: params.WORKFLOW_TCRUDL
  }
};

module.exports = {
  params, steps, workflows
};
