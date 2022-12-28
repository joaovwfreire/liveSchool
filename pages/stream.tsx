import * as React from 'react';

import { Asset } from '../components/Asset';
import { Stream } from '../components/Stream'

const Page = () => {
  return (
    <>
      <Stream />
      <hr />
      <Asset />
    </>
  );
};

export default Page;