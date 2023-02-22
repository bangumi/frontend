import { render } from '@testing-library/react';
import React from 'react';

import Section from '..';

test('should render title and content', () => {
  const { getByText } = render(<Section title='标题'>内容</Section>);

  expect(getByText('标题')).toBeInTheDocument();
  expect(getByText('内容')).toBeInTheDocument();
});

test('should render footer', () => {
  const { getByText } = render(
    <Section title='标题' renderFooter={() => <div>footer</div>}>
      内容
    </Section>,
  );

  expect(getByText('footer')).toBeInTheDocument();
});
