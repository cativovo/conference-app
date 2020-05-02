import Talk from '../../src/components/Talk';
import { render } from '@testing-library/react';

it('should render correctly', () => {
  const { container } = render(
    <Talk
      description="This is a test description"
      name="this is a test name"
      speakerName="this is a test speaker name"
    />
  );
  console.log(container);
});
