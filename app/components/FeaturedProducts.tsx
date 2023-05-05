import React from 'react';
import {NewProductsCollectionQuery} from 'gql/graphql';
import {Image} from '@shopify/hydrogen';
import AlertCircle from '~/icons/AlertCircle';

type FeaturedProductsProps = {
  products: NewProductsCollectionQuery['products']['nodes'];
};

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
}) => (
  <div className="flex flex-row mt-12">
    {products.map((product) => (
      <div className="flex flex-row flex-1" key={product.id}>
        <div className="flex-1">
          <Image
            alt={product.featuredImage?.altText || product.title}
            src={product.featuredImage?.url || ''}
            width={60}
            height={60}
            className="rounded-xl shadow-xl"
          />
        </div>
        <div className="flex flex-col flex-1 grow-[2]">
          <div className="grow"></div>
          <div className="align-middle">
            <AlertCircle />
            <h2 className="inline">{product.title}</h2>
          </div>
        </div>
      </div>
    ))}
  </div>
);
