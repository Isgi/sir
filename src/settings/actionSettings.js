export function createSetting(value) {
  return {
    type: 'CREATE_SETTING',
    payload: value
  };
}

export function allSettings() {
  return {
    type: 'ALL_SETTINGS',
    payload: null
  };
}

export function updateSetting(value) {
  return {
    type: 'UPDATE_SETTING',
    payload: null
  };
}

export function deleteSetting(value) {
  return {
    type: 'DELETE_SETTING',
    payload: null
  };
}
