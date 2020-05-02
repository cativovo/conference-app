import gql from 'graphql-tag';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { ListTalksQuery } from '../API';
import { listTalks as ListTalks } from '../graphql/queries';
import { API } from '../utils';
import Talk from '../components/Talk';

type HomeProps = {
  listTalks: ListTalksQuery['listTalks'];
};

const Home: NextPage<HomeProps, HomeProps> = ({ listTalks }) => {
  const [talks, setTalks] = useState(listTalks?.items);
  return (
    <div>
      {(!Array.isArray(talks) || (talks && talks.length === 0)) && (
        <h1 data-testid="no-talks">No Talks</h1>
      )}
      {talks && (
        <div data-testid="talk-list">
          {talks.map((talk) => talk && <Talk {...talk} key={talk.id} />)}
        </div>
      )}
    </div>
  );
};

Home.getInitialProps = async () => {
  const props: HomeProps = {
    listTalks: null,
  };
  try {
    const { data } = await API.query<ListTalksQuery>({
      query: gql(ListTalks),
    });

    props.listTalks = data.listTalks;
  } catch (error) {
    console.error('error fetching talks');
    console.error(error);
  }
  return props;
};

export default Home;
