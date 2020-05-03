import { render, waitForElement } from '@testing-library/react';
import Home from '../../src/pages/index';
import { API } from '../../src/utils';

jest.mock('../../src/utils/API');

const listTalksItems = [
  {
    __typename: 'Talk',
    id: '1',
    clientId: null,
    name: 'GraphQL in 2020',
    description: 'Using GraphQL in 2020',
    speakerName: 'John Doe',
    speakerBio: 'I love GraphQL',
  },
  {
    __typename: 'Talk',
    id: '2',
    clientId: null,
    name: 'How to cook pancit canton',
    description: 'Cooking perfect pancit canton',
    speakerName: 'Juan Delacruz',
    speakerBio: 'I love pancit canton',
  },
];

it('should render No Talks message', async () => {
  API.query.mockResolvedValue({
    data: {
      listTalks: {
        items: null,
      },
    },
  });
  const { queryByTestId } = render(<Home />);

  const noTalks = queryByTestId('no-talks');

  expect(noTalks).toBeTruthy();
  expect(noTalks?.tagName).toBe('H1');
  expect(noTalks?.textContent).toBe('No Talks');

  const talkList = queryByTestId('talk-list');

  expect(talkList).toBeFalsy();
});
