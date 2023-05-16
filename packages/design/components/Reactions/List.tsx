import './style/List.less';

import React from 'react';

import Button from '../Button';
import { reactionMappings } from './constants';

export interface ReactionsListProps {
  // TODO: Replace with type
  reactions: Array<{
    selected: boolean;
    total: number;
    value: number;
  }>;
}

const ReactionsList = ({ reactions }: ReactionsListProps) => {
  return (
    <div className='bgm-reactions-list'>
      {reactions?.map((reaction) => {
        const reactionValue = reactionMappings.get(reaction.value);
        if (!reactionValue) {
          return null;
        }
        return (
          <Button
            className='bgm-reactions-list__item'
            key={reaction.value}
            type='plain'
            size='medium'
          >
            {reactionMappings.get(reaction.value) && (
              <img
                className='bgm-reactions__smile'
                src={`https://lain.bgm.tv/img/smiles/tv/${reactionValue}.gif`}
              />
            )}{' '}
            {reaction.total}
          </Button>
        );
      })}
    </div>
  );
};

export default ReactionsList;
