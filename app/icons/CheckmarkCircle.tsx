import React from 'react';

type CheckmarkCircleProps = {
  tag: string;
  disabled?: boolean;
  withText?: boolean;
};

export const CheckmarkCircle: React.FC<CheckmarkCircleProps> = ({
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
        className="inline mx-1"
        color={disabled ? '#666666' : '#2789E5'}
      >
        <path
          fill="currentColor"
          d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0 0 114.6 0 256s114.6 256 256 256zm113-303L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
        ></path>
      </svg>
      {withText && (
        <h2 className={disabled ? 'text-[#666666]' : 'text-[#2789E5]'}>
          {tag}
        </h2>
      )}
    </>
  );
};
