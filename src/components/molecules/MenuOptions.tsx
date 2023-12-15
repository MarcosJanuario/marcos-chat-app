import React, { MouseEvent, useState } from 'react';
import { ImageSize, TextType, ImageType } from '../../utils/types';

import Text from '../atoms/Text';

import Image from '../atoms/Image';
import { DEFAULT_MORE_ICON } from '../../utils/consts';

import './menuOptions.scss';

export type MenuOption = {
  key: string;
  label: string;
};

type MenuOptionsProps = {
  options: MenuOption[];
  onOptionClick: (option: MenuOption) => void;
}

const MenuOptions = ({ options, onOptionClick }: MenuOptionsProps) => {
  const [ open, setOpen ] = useState(false);

  const handlingOnOptionClick = (e: MouseEvent<HTMLInputElement>, option: MenuOption):void => {
    e.stopPropagation();
    onOptionClick(option);
  }
  return (
    <div className={'options-wrapper'} onClick={() => setOpen((prevState: boolean) => !prevState)}>
      <Image image={DEFAULT_MORE_ICON} type={ImageType.ICON} size={ImageSize.SMALL} />
      {
        open &&
        options.map((option: MenuOption) =>
          <div key={option.key} className="options-item-wrapper">
            <div className={'item-wrapper'} onClick={(e: MouseEvent<HTMLInputElement>) => handlingOnOptionClick(e, option)}>
              <Text type={TextType.SMALL} color={'#212121'}>{'Delete'}</Text>
            </div>
          </div>)
      }
    </div>
  );
};

export default MenuOptions;
