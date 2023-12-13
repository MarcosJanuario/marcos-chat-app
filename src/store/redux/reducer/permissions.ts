import { createSlice, Reducer } from '@reduxjs/toolkit';
import permissionActions, { PermissionsState } from '../actions/permissions';

export const permissionsInitialState = {
  permission: {
    userEmailPersistenceAllowed: false,
    imageUploadAllowed: false
  }
}

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: permissionsInitialState,
  reducers: {
    ...permissionActions,
    reset: (state: PermissionsState) => (permissionsInitialState),
  },
});

export const {
  updatePermissions
} = permissionsSlice.actions;

export default permissionsSlice.reducer as Reducer<typeof permissionsInitialState>;
