import {
  getLegacyPageLink,
  getSubjectCollectionsLink,
  getSubjectLink,
  getSubjectTagLink,
  getUserProfileLink,
} from './pages';

describe('page links', () => {
  test('generates an internal subject link', () => {
    expect(getSubjectLink(12)).toBe('/subject/12');
  });

  test('generates internal links for pages that are still served by the legacy site', () => {
    expect(getSubjectCollectionsLink(12, 3)).toBe('/subject/12/collections?filter=3');
    expect(getSubjectTagLink('科幻 世界')).toBe(
      '/subject/tag/%E7%A7%91%E5%B9%BB%20%E4%B8%96%E7%95%8C',
    );
    expect(getUserProfileLink('test')).toBe('/user/test');
  });

  test('generates a legacy URL for the router fallback', () => {
    expect(getLegacyPageLink('/subject/12/stats?foo=bar#chart')).toBe(
      'https://bgm.tv/subject/12/stats?foo=bar#chart',
    );
  });
});
