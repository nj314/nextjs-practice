import { render } from '@testing-library/react';

import WhiteboardHome from './whiteboard-home';

describe('WhiteboardHome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WhiteboardHome />);
    expect(baseElement).toBeTruthy();
  });
});
