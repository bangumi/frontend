// @ts-nocheck
import { render } from '@testing-library/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { UserGroup } from '@bangumi/client/user';

import { useUser } from '../../hooks/use-user';
import { RequireAuth } from './auth';

vi.mock('../../hooks/use-user');
const mockedUseUser = vi.mocked(useUser);

vi.mock('react-router-dom');
const mockedUseNavigate = vi.mocked(useNavigate);

afterEach(() => {
  vi.resetAllMocks();
});

const ComponentRequireAuth: React.FC = () => {
  return (
    <RequireAuth groupRequired={[UserGroup.Admin]} redirectUrlWhenUnauthorized='/'>
      只有管理员知道的世界
    </RequireAuth>
  );
};

describe('RequireAuth', () => {
  it('should show content if user is authorized properly', () => {
    mockedUseUser.mockReturnValue({
      user: {
        user_group: UserGroup.Admin,
      },
    });
    const { getByText } = render(<ComponentRequireAuth />);

    expect(getByText('只有管理员知道的世界')).toBeInTheDocument();
  });

  it("should redirect to designated page if user isn't authorized", () => {
    const mockedNavigate = vi.fn();
    mockedUseNavigate.mockReturnValue(mockedNavigate);
    mockedUseUser.mockReturnValue({
      user: {
        user_group: UserGroup.User,
      },
    });

    render(<ComponentRequireAuth />);
    expect(mockedNavigate).toBeCalledWith('/', { replace: true });
  });

  it('should redirect to login page if user is logged', () => {
    const mockedRedirectToLogin = vi.fn();
    mockedUseUser.mockReturnValue({
      user: null,
      redirectToLogin: mockedRedirectToLogin,
    });

    render(<ComponentRequireAuth />);
    expect(mockedRedirectToLogin).toBeCalled();
  });
});
