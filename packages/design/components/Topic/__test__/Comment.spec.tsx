import { fireEvent, render as _render, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import { http, HttpResponse } from 'msw';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { server as mockServer } from '@bangumi/website/mocks/server';

import type { CommentProps } from '../Comment';
import Comment from '../Comment';
import repliesComment from './fixtures/repliesComment.json';
import singleComment from './fixtures/singleComment.json';
import specialComment from './fixtures/specialComment.json';
import mockedCurrentUser from './fixtures/user.json';

// 测试环境没有 turnstile 脚本，mock 成自动通过的验证码
vi.mock('@marsidev/react-turnstile', () => {
  const Turnstile = ({ onSuccess }: { onSuccess?: (token: string) => void }) => {
    React.useEffect(() => {
      onSuccess?.('fake-token');
    });
    return <div />;
  };
  return { Turnstile };
});

function render(component: React.ReactElement, routerEntries?: string[]) {
  return _render(<MemoryRouter initialEntries={routerEntries}>{component}</MemoryRouter>);
}

// 0 正常评论 6 被用户删除 7 违反社区指导原则，已被删除
function buildProps(
  isReply = false,
  comment?: any,
  floor = '233',
  originalPosterId = 233,
  user = mockedCurrentUser,
) {
  const reply = repliesComment.replies[0];
  const mockedComment = comment ?? (isReply ? reply : singleComment);

  const commentProps: CommentProps = {
    ...mockedComment,
    createdAt: dayjs(mockedComment.createdAt).unix(),
    floor,
    originalPosterId,
    user,
    isReply,
  };
  return commentProps;
}

describe('Normal Comment', () => {
  it.each([0, 6, 7])('should render %d', (state) => {
    const props = buildProps();
    const { container } = render(<Comment {...props} state={state} />);
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
    const { container: container1 } = render(<Comment {...props} content='233+123' />);
    expect(container1.getElementsByClassName('bgm-comment__header--collapsed').length).toBe(1);

    const { container: container2 } = render(<Comment {...props} content='233-123' />);
    expect(container2.getElementsByClassName('bgm-comment__header--collapsed').length).toBe(1);

    // should not have collapsed styles if is not reply
    const { container: container3 } = render(<Comment {...buildProps(false)} content='233-123' />);
    expect(container3.getElementsByClassName('bgm-comment__header--collapsed').length).toBe(0);
  });

  // it('show icons', () => {
  //   const props = buildProps(false);
  //   const { container: container1 } = render(<Comment {...props} originalPosterId={233} />);
  //   expect(container1.getElementsByClassName('creator-info')[0]!.childNodes).toHaveLength(3);

  //   const { container: container2 } = render(<Comment {...props} originalPosterId={1} />);
  //   expect(container2.getElementsByClassName('creator-info')[0]!.childNodes).toHaveLength(3);

  //   const { container: container3 } = render(<Comment {...props} originalPosterId={1} />);
  //   expect(container3.getElementsByClassName('creator-info')[0]!.childNodes).toHaveLength(4);
  // });

  it('show edit and delete button if current user is comment creator', () => {
    const user = { ...mockedCurrentUser, id: 1 };
    const props = buildProps(false, singleComment, '233', 233, user);
    const { getByText } = render(<Comment {...props} />);
    expect(getByText('编辑')).toBeInTheDocument();
    expect(getByText('删除')).toBeInTheDocument();
  });

  it('hide edit button if there are subreplies', () => {
    const user = { ...mockedCurrentUser, id: 1 };
    const props = buildProps(false, repliesComment, '233', 233, user);
    const { container } = render(<Comment {...props} />);
    // 选取主评论的操作区域
    const actions = container.querySelector('.bgm-comment__box .bgm-comment-actions')?.textContent;
    expect(actions?.includes('编辑')).toBeFalsy();
    expect(actions?.includes('删除')).toBeTruthy();
  });

  it('do not show opinions if not login', () => {
    const props = buildProps(false, singleComment, '233', 233, null as any);
    const { container } = render(<Comment {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('click reply button should show editor form', () => {
    const props = buildProps(false);
    const { getByText, container, getByTitle } = render(<Comment {...props} />);
    expect(container.getElementsByClassName('bgm-editor__form').length).toBe(0);

    fireEvent.click(getByTitle('回复'));
    expect(container.getElementsByClassName('bgm-editor__form').length).toBe(1);

    fireEvent.click(getByText('取消'));
    expect(container.getElementsByClassName('bgm-editor__form').length).toBe(0);
  });

  it('successful reply should refresh, highlight and hide form otherwise not', async () => {
    const basicReply = { id: 2104702 };
    const mockApi = (status: number) => {
      mockServer.use(
        http.post('/p1/groups/-/topics/1/replies', () => HttpResponse.json(basicReply, { status })),
      );
    };

    const onSuccess = vi.fn();
    const props = buildProps(false);
    const { getByText, container, getByTitle } = render(
      <Comment {...props} onCommentUpdate={onSuccess} topicId={1} />,
    );
    const fillAndSubmit = () => {
      fireEvent.click(getByTitle('回复'));
      fireEvent.change(container.querySelector('textarea')!, { target: { value: '233' } });
      fireEvent.click(getByText('写好了'));
    };

    mockApi(200);
    fillAndSubmit();
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
      expect(document.getElementById(`post_${basicReply.id}`)).toHaveClass(
        'bgm-comment__header--highlighted',
      );
      expect(container.getElementsByClassName('bgm-editor__form').length).toBe(0);
    });

    onSuccess.mockClear();
    mockApi(400);
    fillAndSubmit();
    await waitFor(() => {
      expect(onSuccess).not.toHaveBeenCalled();
      expect(container.getElementsByClassName('bgm-editor__form').length).toBe(1);
    });
  });

  it('should highlight comment corresponding to hash', () => {
    const props = buildProps(false, repliesComment);
    const { container } = render(<Comment {...props} />, ['/groups/topics/1#post_2104702']);
    expect(container).toMatchSnapshot();
  });
});

// reactions（贴贴）
describe('Reactions', () => {
  const reactions = [
    {
      value: 0,
      users: [
        { id: 1, username: 'u1', nickname: '用户1' },
        { id: 2, username: 'u2', nickname: '用户2' },
      ],
    },
    { value: 79, users: [{ id: 3, username: 'u3', nickname: '用户3' }] },
  ];

  it('should render reactions list', () => {
    const props = buildProps(false);
    const { container } = render(<Comment {...props} reactions={reactions} />);
    const items = container.querySelectorAll('button[data-reaction-value]');
    expect(items.length).toBe(2);
    // 当前用户（id=10）没有点赞任何 reaction，不应有 selected 标记
    expect(items[0]!.getAttribute('data-reaction-selected')).toBeNull();
  });

  it('should mark selected if current user reacted', () => {
    const props = buildProps(false);
    const { container } = render(
      <Comment
        {...props}
        reactions={[{ value: 0, users: [{ id: 10, username: 'u10', nickname: '用户10' }] }]}
      />,
    );
    expect(container.querySelectorAll('button[data-reaction-selected]').length).toBe(1);
  });

  it('should call like API and refresh on reaction click', async () => {
    const likeSpy = vi.fn();
    mockServer.use(
      http.put('/p1/groups/-/posts/2104702/like', () => {
        likeSpy();
        return HttpResponse.json({});
      }),
    );
    const onReacted = vi.fn();
    const props = buildProps(false);
    const { container } = render(
      <Comment {...props} reactions={reactions} onCommentUpdate={onReacted} />,
    );
    fireEvent.click(container.querySelector('button[data-reaction-value="0"]')!);
    await waitFor(() => {
      expect(likeSpy).toHaveBeenCalled();
      expect(onReacted).toHaveBeenCalled();
    });
  });

  it('should call unlike API if already reacted', async () => {
    const unlikeSpy = vi.fn();
    mockServer.use(
      http.delete('/p1/groups/-/posts/2104702/like', () => {
        unlikeSpy();
        return HttpResponse.json({});
      }),
    );
    const onReacted = vi.fn();
    const props = buildProps(false);
    const { container } = render(
      <Comment
        {...props}
        onCommentUpdate={onReacted}
        reactions={[{ value: 0, users: [{ id: 10, username: 'u10', nickname: '用户10' }] }]}
      />,
    );
    fireEvent.click(container.querySelector('button[data-reaction-value="0"]')!);
    await waitFor(() => {
      expect(unlikeSpy).toHaveBeenCalled();
      expect(onReacted).toHaveBeenCalled();
    });
  });

  it('should disable reactions for not-logged-in users', () => {
    const props = buildProps(false, singleComment, '233', 233, null as any);
    const { container } = render(<Comment {...props} reactions={reactions} />);
    const items = container.querySelectorAll('button[data-reaction-value]');
    expect(items.length).toBe(2);
    expect((items[0] as HTMLButtonElement).disabled).toBe(true);
  });
});

// 1 关闭 2 重开 5 下沉
describe('Special Comment', () => {
  function buildProps(state: number) {
    return {
      ...specialComment,
      createdAt: dayjs(specialComment.createdAt).unix(),
      state,
    } as unknown as CommentProps;
  }

  it.each([1, 2, 5])('should render state is %d', (state) => {
    const props = buildProps(state);
    const { container } = render(<Comment {...props} />);
    expect(container).toMatchSnapshot();
  });
});
