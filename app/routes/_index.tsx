import {useLoaderData} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {LoaderArgs, defer} from '@shopify/remix-oxygen';
import {NewProductsCollectionQuery} from 'gql/graphql';
import {FeaturedProducts} from '~/components/FeaturedProducts';
import ProductStats from '~/components/ProductStats';
import { RocketCard } from '~/components/RocketCard';

export function meta() {
  return [
    {title: 'Fancy Store'},
    {description: 'Beautiful Shopify Storefront'},
  ];
}

export async function loader({context}: LoaderArgs) {
  return await context.storefront.query<NewProductsCollectionQuery>(
    NEW_PRODUCTS_QUERY,
  );
}

export default function Index() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col">
      <div>
        <h1>Dashboard</h1>
      </div>

      <div className="flex min-h-[280px] my-12">
        <div className="flex-1 grow-[2] border border-solid border-gray-200 rounded-xl shadow-xl p-8">
          <ProductStats />
        </div>

        <div className="flex flex-col-reverse flex-1 ml-24 rounded-[12px] bg-[#EDF6FF] bg-[url('/assets/rocketcard-bg.svg')]">
          <RocketCard />
        </div>
      </div>

      <div className="flex flex-col">
        <div>
          <h2>Recently updated products</h2>
        </div>
        <FeaturedProducts products={products.nodes} />
      </div>
    </div>
  );
}

const NEW_PRODUCTS_QUERY = /* GraphQL */ `
  query NewProductsCollection {
    products(first: 4) {
      nodes {
        id
        title
        featuredImage {
          altText
          url
        }
      }
    }
  }
`;
