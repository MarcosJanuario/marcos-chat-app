import React, { FC, useState } from 'react';
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
};

const MenuOptions: FC<MenuOptionsProps> = ({ options, onOptionClick }) => {
  const [open, setOpen] = useState(false);

  const handleOptionClick = (e: React.MouseEvent<HTMLDivElement>, option: MenuOption): void => {
    e.stopPropagation();
    onOptionClick(option);
  };

  return (
    <div className={`options-wrapper`} onClick={() => setOpen((prevOpen) => !prevOpen)}>
      <Image image={DEFAULT_MORE_ICON} type={ImageType.ICON} size={ImageSize.SMALL} />
      <div className={`options-dropdown ${open ? 'open' : ''}`}>
        {options.map((option: MenuOption) => (
          <div key={option.key} className="options-item-wrapper" onClick={(e) => handleOptionClick(e, option)}>
            <Text type={TextType.SMALL} color="#212121">
              {option.label}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuOptions;
