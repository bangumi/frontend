import React from 'react';
import { useParams } from 'react-router-dom';

import { UnreadableCodeError } from '@bangumi/utils/index.ts';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import { useCharacterHome } from '@bangumi/website/hooks/use-character-home.ts';

import CharacterDetail from './CharacterDetail.tsx';

function CharacterPage() {
  const { id } = useParams();
  const characterID = Number(id);

  if (!Number.isInteger(characterID) || characterID <= 0) {
    throw new UnreadableCodeError('BUG: character id is invalid');
  }

  const { data } = useCharacterHome(characterID);

  if (!data) {
    return null;
  }

  return <CharacterDetail data={data} />;
}

export default withErrorBoundary(CharacterPage, {
  404: () => <div>没有找到角色</div>,
});
