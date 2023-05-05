import {useLoaderData} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {LoaderArgs, defer} from '@shopify/remix-oxygen';
import {NewProductsCollectionQuery} from 'gql/graphql';
import ProductStats from '~/components/ProductStats';
import AlertCircle from '~/icons/AlertCircle';

export function meta() {
  return [
    {title: 'Fancy Store'},
    {description: 'A custom storefront powered by Hydrogen'},
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
          <div className="m-12">
            <div>
              <div className="text-neutral-800 text-center">
                Brainstrom new descriptions or generate FAQs directly from the
                app.
              </div>
            </div>
            <div className="flex flex-col justify-center mt-12">
              <a
                href="/products"
                className="text-2xl text-center text-white rounded-xl bg-[#2789E5] hover:pointer py-3 w-full"
              >
                View All Products
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div>
          <h2>Recently updated products</h2>
        </div>
        <div className="flex flex-row mt-12">
          {products.nodes.map((product) => (
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
