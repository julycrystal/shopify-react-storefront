import React from 'react';

type FloppyDiskParams = {
  tag: string;
  disabled?: boolean;
  withText?: boolean;
};

export const FloppyDisk: React.FC<FloppyDiskParams> = ({
  tag,
  disabled,
  withText,
}) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        width="12"
        height="12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className={'inline mx-1'}
        color={disabled ? '#666666' : '#999999'}
      >
        <path
          fill="currentColor"
          d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7c-12-12-28.3-18.7-45.3-18.7H64zm0 96c0-17.7 14.3-32 32-32h192c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32v-64zm160 160a64 64 0 110 128 64 64 0 110-128z"
        ></path>
      </svg>
      {withText && (
        <h2 className={disabled ? 'text-[#666666]' : 'text-[#999999]'}>{tag}</h2>
      )}
    </>
  );
};
