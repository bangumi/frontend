import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Image from '..';

const src =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTM2IiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDEzNiAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cmVjdCB3aWR0aD0iMTM2IiBoZWlnaHQ9IjIwMCIgcng9IjYiIGZpbGw9ImFxdWEiLz4NCjwvc3ZnPg0K';

describe('<Image />', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<Image src={src} alt='vanilla' />);

    expect(getByTestId('img-wrapper')).toMatchSnapshot();
  });

  it('should render box-shadow properly', () => {
    const { getByTestId } = render(<Image src={src} alt='vanilla' withBoxShadow />);

    expect(getByTestId('img-wrapper')).toMatchSnapshot();
  });

  it('should render hovering styles properly', () => {
    const { getByTestId } = render(<Image src={src} alt='vanilla' withBoxShadow />);

    const Img = getByTestId('img-wrapper');

    fireEvent.mouseEnter(Img);

    expect(Img).toMatchSnapshot();
  });

  it('should render circle shape properly', () => {
    const { getByTestId } = render(<Image src={src} alt='vanilla' withBoxShadow shape='circle' />);

    expect(getByTestId('img-wrapper')).toMatchSnapshot();
  });
});
