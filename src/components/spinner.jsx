
import Image from 'next/image';
import React from 'react';

const Spinner = () => (
  <div className="flex justify-center items-center h-full  py-[4.75rem]">
    <Image width={100} height={100} src="/loadingIcon.gif" alt="Loading..." />
  </div>
);

export default Spinner;