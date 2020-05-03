import gql from 'graphql-tag';
import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { ListTalksQuery } from '../API';
import { listTalks as ListTalks } from '../graphql/queries';
import { API } from '../utils';
import Talk from '../components/Talk';

const Home: NextPage = () => {
  const [listTalks, setListTalks] = useState<ListTalksQuery['listTalks']>(null);

  const getTalks = async () => {
    const { data } = await API.query<ListTalksQuery>({
      query: gql(ListTalks),
    });

    setListTalks(data.listTalks);
  };

  useEffect(() => {
    getTalks();
  });
  if (typeof window !== 'undefined') {
    return (
      <div>
        {(!Array.isArray(listTalks?.items) || (listTalks && listTalks.items.length === 0)) && (
          <h1 data-testid="no-talks">No Talks</h1>
        )}
        {listTalks && listTalks.items && (
          <div data-testid="talk-list">
            {listTalks.items.map((talk) => talk && <Talk {...talk} key={talk.id} />)}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default Home;
