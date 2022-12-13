import { fireEvent, render } from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';

import type { CommentProps } from '../Comment';
import Comment from '../Comment';
import repliesComment from './fixtures/repliesComment.json';
import singleComment from './fixtures/singleComment.json';
import specialComment from './fixtures/specialComment.json';
import mockedCurrentUser from './fixtures/user.json';

// 0 正常评论 6 被用户删除 7 违反社区指导原则，已被删除
describe('Normal Comment', () => {
  function buildProps(
    isReply = false,
    comment?: any,
    floor = '233',
    originalPosterId = 233,
    user = mockedCurrentUser,
  ) {
    const reply = repliesComment.replies[0];
    const mockedComment = comment ?? (isReply ? reply : singleComment);
    return {
      ...mockedComment,
      createdAt: dayjs(mockedComment.created_at).unix(),
      floor,
      originalPosterId,
      user,
      isReply,
    } as CommentProps;
  }

  it.each([0, 6, 7])('should render %d', (state) => {
    const props = buildProps();
    const { container } = render(<Comment {...props} state={state as any} />);
    expect(container).toMatchSnapshot();
  });

  it('should render with reply', () => {
    const props = buildProps(false, repliesComment);
    const { container } = render(<Comment {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('reply should have reply styles', () => {
    const props = buildProps(true);
    const { container } = render(<Comment {...props} />);
    // should have reply styles
    expect(container.getElementsByClassName('bgm-comment__header--reply').length).toBe(1);

    // should not have collapsed styles
    expect(container.getElementsByClassName('bgm-comment__header--collapsed').length).toBe(0);
  });

  it('reply end with +1/-1 reply should be collapsed', () => {
    const props = buildProps(true);
    const { container: container1 } = render(<Comment {...props} text='233+123' />);
    expect(container1.getElementsByClassName('bgm-comment__header--collapsed').length).toBe(1);

    const { container: container2 } = render(<Comment {...props} text='233-123' />);
    expect(container2.getElementsByClassName('bgm-comment__header--collapsed').length).toBe(1);

    // should not have collapsed styles if is not reply
    const { container: container3 } = render(<Comment {...buildProps(false)} text='233-123' />);
    expect(container3.getElementsByClassName('bgm-comment__header--collapsed').length).toBe(0);
  });

  it('show icons', () => {
    const props = buildProps(false);
    const { container: container1 } = render(
      <Comment {...props} isFriend originalPosterId={233} />,
    );
    expect(container1.getElementsByClassName('creator-info')[0]!.childNodes).toHaveLength(3);

    const { container: container2 } = render(
      <Comment {...props} isFriend={false} originalPosterId={1} />,
    );
    expect(container2.getElementsByClassName('creator-info')[0]!.childNodes).toHaveLength(3);

    const { container: container3 } = render(<Comment {...props} isFriend originalPosterId={1} />);
    expect(container3.getElementsByClassName('creator-info')[0]!.childNodes).toHaveLength(4);
  });

  it('show edit and delete button if current user is comment creator', () => {
    const user = { ...mockedCurrentUser, id: 1 };
    const props = buildProps(false, singleComment, '233', 233, user);
    const { getByText } = render(<Comment {...props} />);
    expect(getByText('编辑')).toBeInTheDocument();
    expect(getByText('删除')).toBeInTheDocument();
  });

  it('do not show opinions if not login', () => {
    const props = buildProps(false, singleComment, '233', 233, null as any);
    const { container } = render(<Comment {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('click reply button should show editor form', () => {
    const props = buildProps(false);
    const { getByText, container } = render(<Comment {...props} />);
    expect(container.getElementsByClassName('bgm-editor__form').length).toBe(0);

    fireEvent.click(getByText('回复'));
    expect(container.getElementsByClassName('bgm-editor__form').length).toBe(1);

    fireEvent.click(getByText('取消'));
    expect(container.getElementsByClassName('bgm-editor__form').length).toBe(0);
  });
});

// 1 关闭 2 重开 5 下沉
describe('Special Comment', () => {
  function buildProps(state: number) {
    return {
      ...specialComment,
      createdAt: dayjs(specialComment.created_at).unix(),
      state,
    } as unknown as CommentProps;
  }

  it.each([1, 2, 5])('should render state is %d', (state) => {
    const props = buildProps(state);
    const { container } = render(<Comment {...props} />);
    expect(container).toMatchSnapshot();
  });
});
