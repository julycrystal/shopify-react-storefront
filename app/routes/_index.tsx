import {useLoaderData} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {LoaderArgs, defer} from '@shopify/remix-oxygen';
import {FeaturedCollectionQuery} from 'gql/graphql';

export function meta() {
  return [
    {title: 'Fancy Store'},
    {description: 'A custom storefront powered by Hydrogen'},
  ];
}

export async function loader({context}: LoaderArgs) {
  return await context.storefront.query<FeaturedCollectionQuery>(
    NEW_PRODUCTS_QUERY,
  );
}

export default function Index() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <div>
      <h3>Hello from the home page!</h3>

      {products.nodes.map((product) => (
        <>
          <Image
            alt={product.featuredImage?.altText || ''}
            src={product.featuredImage?.url}
          />
        </>
      ))}
    </div>
  );
}

const NEW_PRODUCTS_QUERY = /* GraphQL */ `
  query FeaturedCollection {
    products(first: 4) {
      nodes {
        title
        featuredImage {
          altText
          url
        }
      }
    }
  }
`;
