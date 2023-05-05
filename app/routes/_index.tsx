import {useLoaderData} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {LoaderArgs, defer} from '@shopify/remix-oxygen';
import {GraphDataQuery, NewProductsCollectionQuery} from 'gql/graphql';
import {FeaturedProducts} from '~/components/FeaturedProducts';
import ProductStats from '~/components/ProductStats';
import {RocketCard} from '~/components/RocketCard';

export function meta() {
  return [{title: 'Storefront'}, {description: 'Beautiful Shopify Storefront'}];
}

export async function loader({context}: LoaderArgs) {
  const [products, graph] = await Promise.all([
    context.storefront.query<NewProductsCollectionQuery>(NEW_PRODUCTS_QUERY),
    context.storefront.query<GraphDataQuery>(GRAPH_DATA_QUERY),
  ]);
  return {products, graph};
}

export default function Index() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col">
      <div>
        <h1>Dashboard</h1>
      </div>

      <div className="md:flex min-h-[280px] my-12">
        <div className="flex-1 grow-[2] border border-solid border-gray-200 rounded-xl shadow-xl p-8">
          <ProductStats />
        </div>

        <RocketCard className="" />
      </div>

      <div className="flex flex-col">
        <div>
          <h2>Recently updated products</h2>
        </div>
        <FeaturedProducts products={products.products.nodes} />
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
        tags
        featuredImage {
          altText
          url
        }
      }
    }
  }
`;

const GRAPH_DATA_QUERY = /* GraphQL */ `
  query GraphData {
    productTags(first: 4) {
      edges {
        node
      }
    }
  }
`;
