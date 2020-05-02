import { render } from '@testing-library/react';
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

it('should return items with array of talks', async () => {
  API.query.mockResolvedValue({
    data: {
      listTalks: {
        items: listTalksItems,
      },
    },
  });
  const props = await Home.getInitialProps();

  expect(props).toBeTruthy();
  expect(Array.isArray(props.listTalks.items)).toBeTruthy();
  expect(props.listTalks.items[0]).toMatchObject(listTalksItems[0]);
});

it('should return item with null value', async () => {
  API.query.mockResolvedValue({
    data: {
      listTalks: {
        items: null,
      },
    },
  });

  const props = await Home.getInitialProps();

  expect(props).toBeTruthy();
  expect(Array.isArray(props.listTalks.items)).toBeFalsy();
});

it('should render no talks', async () => {
  API.query.mockResolvedValue({
    data: {
      listTalks: {
        items: null,
      },
    },
  });

  const props = await Home.getInitialProps();

  const { queryByTestId } = render(<Home {...props} />);
  const noTalks = queryByTestId('no-talks');

  expect(noTalks).toBeTruthy();
  expect(noTalks?.tagName).toBe('H1');
  expect(noTalks?.textContent).toBe('No Talks');

  const talkList = queryByTestId('talk-list');
  expect(talkList).toBeFalsy();
});

it('should render talk list', async () => {
  API.query.mockResolvedValue({
    data: {
      listTalks: {
        items: listTalksItems,
      },
    },
  });

  const props = await Home.getInitialProps();

  const { queryByTestId, container } = render(<Home {...props} />);
  const noTalks = queryByTestId('no-talks');

  expect(noTalks).toBeFalsy();

  const talkList = queryByTestId('talk-list');

  expect(talkList).toBeTruthy();
  expect(talkList?.tagName).toBe('DIV');
  expect(talkList?.children.length).toBe(2);
});
