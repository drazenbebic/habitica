'use client';

import { NextPage } from 'next';
import { Pane, Paragraph } from 'evergreen-ui';

const Home: NextPage = () => {
  return (
    <Pane display="grid" padding={16}>
      <Pane display="grid">
        <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>
      </Pane>
    </Pane>
  );
};

export default Home;
