import React, { useContext } from 'react';
import { UIContext, UIReducer } from '../../store/context/UIContext';

import Button from '../atoms/Button';

import { useDispatch } from 'react-redux';
import { updatePermissions } from '../../store/redux/reducer/permissions';

import './modalPermissions.scss';

const ModalPermissions = () => {
  const { dispatchUI } = useContext<UIReducer>(UIContext);
  const dispatch = useDispatch();
  const handleOnClose = (): void => {
    dispatchUI({ type: 'RESET_MODAL'});
  }

  const handlePermissionGranted = (): void => {
    dispatch(updatePermissions({
      userEmailPersistenceAllowed: true,
      imageUploadAllowed: true
    }));
    dispatchUI({ type: 'RESET_MODAL'});
  }

  return (
    <>
      <div className="content-text-wrapper">

        <p>Hello,</p>

        <p>Thank you for exploring my web chat application built with the ReactJS framework. Before you proceed, I
          would like to inform you about the purpose and functionality of this application.</p>

        <p>Purpose:</p>
        <p>This web chat application has been developed purely to showcase my skills in building interactive and dynamic
          applications using the ReactJS framework. It is a demonstration of my proficiency and creativity in creating
          user-friendly interfaces and efficient functionalities.</p>

        <p>Data Handling:</p>
        <p>In order to provide you with a seamless experience, the data information you provided in the Registration form need to be stored during the
          registration process in the Google Firebase database. This includes your registration details and, if uploaded,
          your profile image. Rest assured that this information will be used exclusively for the purpose of demonstrating
          the functionality of the chat application. There are no financial goals associated with this application.</p>

        <p>Data Deletion:</p>
        <p>Since this application is solely for demonstration purposes, I want to let you know that periodically
          all data stored in the database will be deleted. This means that if you revisit the application at a later time, you may
          need to register again. This practice helps to maintain a clean and efficient demonstration environment.</p>

        <p>By using this web chat application, you agree to the collection and storage of your registration data for the
          purposes mentioned above. If you have any concerns or questions, please feel free to reach out.</p>

        <p>Best regards,<br/>Marcos Januário</p>
      </div>
      <div className="permissions-action-wrapper">
        <Button
          text={'Decline'}
          onClick={handleOnClose}
          style={{ backgroundColor: '#ff1744'}}
        />
        <Button
          text={'Accept'}
          onClick={handlePermissionGranted}
        />
      </div>
    </>
  );
}

export default ModalPermissions;
