import React from 'react';

type AlertCircleType = {
  tag: string;
  disabled?: boolean;
  withText?: boolean;
};

export const AlertCircle: React.FC<AlertCircleType> = ({
  tag,
  disabled,
  withText,
}) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="12"
        height="12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="inline mx-1"
        color={disabled ? '#666666' : '#EBB21E'}
      >
        <path
          fill="currentColor"
          d="M256 512a256 256 0 100-512 256 256 0 100 512zm0-384c13.3 0 24 10.7 24 24v112c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm-32 224a32 32 0 1164 0 32 32 0 11-64 0z"
        />
      </svg>
      {withText && (
        <h2 className={disabled ? 'text-[#666666]' : 'text-[#EBB21E]'}>
          {tag}
        </h2>
      )}
    </>
  );
};
