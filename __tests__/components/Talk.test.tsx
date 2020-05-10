import Talk from '../../src/components/Talk';
import { render } from '@testing-library/react';

it('should render correctly', () => {
  const props = {
    description: 'This is a test description',
    name: 'this is atest name',
    speakerName: 'This is a test speaker name',
  };
  const { container, queryByTestId } = render(<Talk {...props} />);

  const speakerName = queryByTestId('speaker-name');
  const name = queryByTestId('name');
  const description = queryByTestId('description');

  expect(container).toBeTruthy();
  expect(container.tagName).toBe('DIV');

  expect(speakerName).toBeTruthy();
  expect(speakerName?.tagName).toBe('H3');
  expect(speakerName?.textContent).toBe(props.speakerName);

  expect(name).toBeTruthy();
  expect(name?.tagName).toBe('H5');
  expect(name?.textContent).toBe(props.name);

  expect(description).toBeTruthy();
  expect(description?.tagName).toBe('P');
  expect(description?.textContent).toBe(props.description);

  expect(container).toMatchSnapshot();
});
