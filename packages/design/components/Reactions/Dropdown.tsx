import './style/Dropdown.less';

import React from 'react';

import { Reaction } from '@bangumi/icons';

import Button from '../Button';
import Popover from '../Popover';
import { reactions } from './constants';

export interface ReactionsDropdownProps {
  showText?: boolean;
  onClick?: (key: number) => void;
}

const ReactionsDropdown = ({ showText = false, onClick }: ReactionsDropdownProps) => {
  return (
    <Popover
      className='bgm-reactions-dropdown'
      content={
        <ul className='bgm-reactions-dropdown__grid'>
          {reactions.map(([key, value]) => (
            <li
              key={key}
              className='bgm-reactions-dropdown__item'
              onClick={() => {
                onClick?.(key);
              }}
            >
              <img
                className='bgm-reactions-dropdown__smile'
                src={`https://lain.bgm.tv/img/smiles/tv/${value}.gif`}
              />
            </li>
          ))}
        </ul>
      }
    >
      <Button type='plain' className='bgm-reactions-dropdown__button'>
        <Reaction />
        {showText && '贴贴'}
      </Button>
    </Popover>
  );
};

export default ReactionsDropdown;
