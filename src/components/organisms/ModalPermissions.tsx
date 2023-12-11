import React, { useContext, useEffect } from 'react';
import { UIContext, UIReducer } from '../../store/context/UIContext';
import Text from '../atoms/Text';

import { ImageType, TextType } from '../../utils/types';

import './modalPermissions.scss';
import Image from '../atoms/Image';
import { DEFAULT_CLOSE_ICON } from '../../utils/consts';
import Button from '../atoms/Button';
import { PermissionsContext, PermissionsReducer } from '../../store/context/PermissionContext';


const ModalPermissions = () => {
  const { data: ui, dispatchUI } = useContext<UIReducer>(UIContext);
  const { data: userPermission, dispatchPermissions } = useContext<PermissionsReducer>(PermissionsContext);

  useEffect(() => {
    console.log('[MODAL PERMISSIONS]: ', ui);
  }, []);

  const handleOnClose = (): void => {
    dispatchUI({ type: 'RESET_MODAL'});
  }

  const handlePermissionGranted = (): void => {
    dispatchPermissions({
      type: 'UPDATE_PERMISSION',
      payload: {
        permission: {
          persistUserEmail: true,
          uploadUserImages: true,
        }
      }
    });
    dispatchUI({ type: 'RESET_MODAL'});
  }

  return (
    <div className="modal-permissions-wrapper">
      <div className="modal-header-wrapper">
        <div className={'modal-action-wrapper'}>
          <Image image={DEFAULT_CLOSE_ICON} type={ImageType.ICON} onClick={handleOnClose} />
        </div>
        <div className="modal-header">
          <Text type={TextType.HEADER}>Permissions</Text>
        </div>
      </div>
      <div className="content-text-wrapper">
        <h2>Permission Request: Marcos Chat</h2>

        <p>Hello,</p>

        <p>Thank you for exploring my web chat application built with the ReactJS framework. Before you proceed, I
          would like to inform you about the purpose and functionality of this application.</p>

        <h3>Purpose:</h3>
        <p>This web chat application has been developed purely to showcase my skills in building interactive and dynamic
          applications using the ReactJS framework. It is a demonstration of my proficiency and creativity in creating
          user-friendly interfaces and efficient functionalities.</p>

        <h3>Data Handling:</h3>
        <p>In order to provide you with a seamless experience, the data information you provided in the Registration form need to be stored during the
          registration process in the Google Firebase database. This includes your registration details and, if uploaded,
          your profile image. Rest assured that this information will be used exclusively for the purpose of demonstrating
          the functionality of the chat application. There are no financial goals associated with this application.</p>

        <h3>Data Deletion:</h3>
        <p>Since this application is solely for demonstration purposes, I want to let you know that periodically
          all data stored in the database will be deleted. This means that if you revisit the application at a later time, you may
          need to register again. This practice helps to maintain a clean and efficient demonstration environment.</p>

        <p>By using this web chat application, you agree to the collection and storage of your registration data for the
          purposes mentioned above. If you have any concerns or questions, please feel free to reach out.</p>

        <p>Thank you for your understanding and cooperation.</p>

        <p>Best regards,<br/>Marcos Januário</p>
      </div>
      <div className="permissions-action-wrapper">
        <Button
          text={'Decline'}
          onClick={handleOnClose}
          style={{ backgroundColor: '#ffcdd2'}}
        />
        <Button
          text={'Accept'}
          onClick={handlePermissionGranted}
        />
      </div>
    </div>
  );
}

export default ModalPermissions;
