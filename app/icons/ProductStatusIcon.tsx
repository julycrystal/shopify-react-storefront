import React from 'react';
import {AlertCircle} from './AlertCircle';
import {CheckmarkCircle} from './CheckmarkCircle';
import {FloppyDisk} from './FloppyDisk';
import {PaperPlane} from './PaperPlane';

type ProductStatusIconProps = React.SVGAttributes<null> & {
  tag: string;
  disabled?: boolean;
};

export const ProductStatusIcon: React.FC<ProductStatusIconProps> = ({
  tag,
  ...props
}) =>
  tag === 'Not Started Yet' ? (
    <AlertCircle tag={tag} {...props} />
  ) : tag === 'Reviewed' ? (
    <CheckmarkCircle tag={tag} {...props} />
  ) : tag === 'Saved For Later' ? (
    <FloppyDisk tag={tag} {...props} />
  ) : tag === 'Published' ? (
    <PaperPlane tag={tag} {...props} />
  ) : (
    <div>{tag}</div>
  );
