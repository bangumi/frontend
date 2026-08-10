import { getSubjectLink } from './pages';

describe('page links', () => {
  test('generates an internal subject link', () => {
    expect(getSubjectLink(12)).toBe('/subject/12');
  });
});
