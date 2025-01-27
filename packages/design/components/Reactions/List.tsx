import './style/List.less';

import React from 'react';

import type { Reaction } from '@bangumi/client/client';

import Button from '../Button';
import { reactionMappings } from './constants';

export interface ReactionsListProps {
  reactions: Reaction[];
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
