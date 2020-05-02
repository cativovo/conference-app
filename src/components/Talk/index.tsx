import React from 'react';

type TalkProps = {
  speakerName: string;
  name: string;
  description: string;
};

const Talk: React.FC<TalkProps> = ({ speakerName, name, description }) => (
  <div>
    <h3 data-testid="speaker-name">{speakerName}</h3>
    <h5 data-testid="name">{name}</h5>
    <p data-testid="description">{description}</p>
  </div>
);

export default Talk;
