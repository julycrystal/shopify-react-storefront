import React from 'react';
import {NewProductsCollectionQuery} from 'gql/graphql';
import {Image} from '@shopify/hydrogen';
import AlertCircle from '~/icons/AlertCircle';
import {ProductStatusIcon} from '~/icons/ProductStatusIcon';

type FeaturedProductsProps = {
  products: NewProductsCollectionQuery['products']['nodes'];
};

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
}) => (
  <div className="md:flex md:flex-row mt-12">
    {products.map((product) => (
      <div className="mt-4 md:mt-0 flex flex-row flex-1" key={product.id}>
        <div className="flex-none">
          <Image
            alt={product.featuredImage?.altText || product.title}
            src={product.featuredImage?.url || ''}
            width={60}
            height={60}
            className="rounded-xl shadow-xl"
          />
        </div>
        <div className="flex flex-col flex-1">
          <div className="grow"></div>
          <div className="align-middle">
            <ProductStatusIcon tag={product.tags[0]} />
            <h2 className="inline">{product.title}</h2>
          </div>
        </div>
      </div>
    ))}
  </div>
);
