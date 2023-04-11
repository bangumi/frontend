import './style';

import React from 'react';

import { Reaction } from '@bangumi/icons';

import Button from '../Button';
import Popover from '../Popover';

export interface ReactionsDropdownProps {
  onClick?: (key: number) => void;
}

// 使用数组以保证顺序
const reactions: Array<[number, string]> = [
  [0, '44'], // bgm67
  [140, '101'], // bgm124
  [80, '41'], // bgm64
  [54, '15'], // bgm38
  [85, '46'], // bgm69

  [104, '65'], // bgm88
  [88, '49'], // bgm72
  [62, '23'], // bgm46
  [79, '40'], // bgm63
  [53, '14'], // bgm37

  [122, '83'], // bgm106
  [92, '53'], // bgm76
  [118, '79'], // bgm102
  [141, '102'], // bgm125
  [90, '51'], // bgm74

  [76, '37'], // bgm60
  [60, '21'], // bgm44
  [128, '89'], // bgm112
  [47, '08'], // bgm31
  [68, '29'], // bgm52

  [137, '98'], // bgm121
  [132, '93'], // bgm116
];

const ReactionsDropdown = ({ onClick }: ReactionsDropdownProps) => {
  return (
    <Popover
      className='bgm-reactions'
      content={
        <ul className='bgm-reactions__grid'>
          {reactions.map(([key, value]) => (
            <li
              key={key}
              className='bgm-reactions__item'
              onClick={() => {
                onClick?.(key);
              }}
            >
              <img
                className='bgm-reactions__smile'
                src={`https://lain.bgm.tv/img/smiles/tv/${value}.gif`}
              />
            </li>
          ))}
        </ul>
      }
    >
      <Button type='plain' className='bgm-reactions__button'>
        <Reaction />
      </Button>
    </Popover>
  );
};

export default ReactionsDropdown;
