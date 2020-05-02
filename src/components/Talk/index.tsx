import React from 'react';

type TalkProps = {
  speakerName: string;
  name: string;
  description: string;
};

const Talk: React.FC<TalkProps> = ({ speakerName, name, description }) => (
  <div>
    <h3>{speakerName}</h3>
    <h5>{name}</h5>
    <p>{description}</p>
  </div>
);

export default Talk;
