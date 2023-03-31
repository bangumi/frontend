import { render } from '@testing-library/react';
import React from 'react';

import { WikiElement } from '@bangumi/utils';

import WikiBeginnerEditor from './WikiBeginnerEditor';

it('should match snapshot', () => {
  const els: WikiElement[] = [{ _id: 'yufi' }, { _id: 'anisu' }];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onChange = () => {};
  const editor = render(<WikiBeginnerEditor elements={els} onChange={onChange} />);
  expect(editor).toMatchSnapshot();
});

it('add WikiElement properly', async () => {
  let res: WikiElement[] = [];
  const onChange = (newEls: WikiElement[]) => {
    res = newEls;
  };

  const editor = render(<WikiBeginnerEditor elements={res} onChange={onChange} />);

  const addRootWikiElementBtn = await editor.findByText('新增一级项目');
  const addSubWikiElementBtn = await editor.findByText('新增二级项目');

  //   新增一级项目
  addRootWikiElementBtn.click();
  editor.rerender(<WikiBeginnerEditor elements={res} onChange={onChange} />);

  //   新增一级项目
  addRootWikiElementBtn.click();
  editor.rerender(<WikiBeginnerEditor elements={res} onChange={onChange} />);
  //   新增二级
  addSubWikiElementBtn.click();
  editor.rerender(<WikiBeginnerEditor elements={res} onChange={onChange} />);
  addSubWikiElementBtn.click();
  editor.rerender(<WikiBeginnerEditor elements={res} onChange={onChange} />);

  //   新增一级
  addRootWikiElementBtn.click();
  editor.rerender(<WikiBeginnerEditor elements={res} onChange={onChange} />);

  expect(res[1]).toBeInstanceOf(WikiElement);
  expect(res[1]?.value?.length).toBe(2);
  expect(res.length).toBe(3);
});

it('remove WikiElement properly', () => {
  let res: WikiElement[] = [{ _id: 'yufi' }, { _id: 'anisu' }];
  const onChange = (newEls: WikiElement[]) => {
    res = newEls;
  };

  const editor = render(<WikiBeginnerEditor elements={res} onChange={onChange} />);
  const removeHandlers = editor.getAllByTitle('删除一项');
  const removeYufi = removeHandlers[0];
  removeYufi?.click();
  expect(res.length).toBe(1);
  expect(res[0]?._id).toBe('anisu');
});
