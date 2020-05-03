import gql from 'graphql-tag';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { ListTalksQuery } from '../API';
import Talk from '../components/Talk';
import { listTalks as ListTalks } from '../graphql/queries';
import { setTalks, useTalks, toggleLoading } from '../hooks';
import { Talk as TTalk } from '../types';
import { API } from '../utils';

const Home: NextPage = () => {
  const [{ talks, isLoading }, dispatch] = useTalks();

  const getTalks = async () => {
    const { data } = await API.query<ListTalksQuery>({
      query: gql(ListTalks),
    });

    if (data && data.listTalks && data.listTalks.items) {
      const talks = data.listTalks.items.filter((item): item is TTalk => item !== null);
      dispatch(setTalks(talks));
    }
  };

  useEffect(() => {
    getTalks();
  }, []);

  if (typeof window !== 'undefined') {
    return (
      <div>
        {isLoading && <h1 data-testid="loading">Loading...</h1>}
        {talks.length === 0 && !isLoading && <h1 data-testid="no-talks">No Talks</h1>}
        {talks.length > 0 && (
          <div data-testid="talk-list">
            {talks.map((talk) => (
              <Talk {...talk} key={talk.id} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default Home;
