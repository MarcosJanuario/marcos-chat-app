import { PayloadAction } from '@reduxjs/toolkit';

export type PermissionsState = {
  permission: {
    userEmailPersistenceAllowed: boolean;
    imageUploadAllowed: boolean;
  }
}

export type UserDataPersistencePermission = {
  userEmailPersistenceAllowed: boolean;
  imageUploadAllowed: boolean;
}

const permissionActions = {
  updatePermissions: (state: PermissionsState, action: PayloadAction<UserDataPersistencePermission>) => {
    console.log('[PERMISSIONS_ACTIONS] state: ', state.permission);
    console.log('[PERMISSIONS_ACTIONS] action: ', action);
    state.permission = action.payload;
  }
};

export default permissionActions;
