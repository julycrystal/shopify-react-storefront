import {useState} from 'react';
import {useLoaderData} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {LoaderArgs, defer} from '@shopify/remix-oxygen';
import {ProductsCollectionQuery} from 'gql/graphql';
import AlertCircle from '~/icons/AlertCircle';
import ArrowLeft from '~/icons/ArrowLeft';
import CheckmarkCircle from '~/icons/CheckmarkCircle';
import ChevronLeft from '~/icons/ChevronLeft';
import ChevronRight from '~/icons/ChevronRight';
import FloppyDisk from '~/icons/FloppyDisk';
import PaperPlane from '~/icons/PaperPlane';

export function meta() {
  return [
    {title: 'Fancy Store'},
    {description: 'A custom storefront powered by Hydrogen'},
  ];
}

export async function loader({context}: LoaderArgs) {
  return await context.storefront.query<ProductsCollectionQuery>(
    NEW_PRODUCTS_QUERY,
  );
}

export default function Index() {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const {products} = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div>
          <a href="/">
            <ArrowLeft />
          </a>

          <h1 className="inline">All Products</h1>
        </div>
        <div className="flex flex-row">
          <div>
            <h2>Filter by:</h2>
          </div>
          <div className="ml-4">
            <AlertCircle />
            <h2 className="inline">Not Started Yet</h2>
          </div>
          <div className="ml-4">
            <CheckmarkCircle />
            <h2 className="inline">Reviewed</h2>
          </div>
          <div className="ml-4">
            <FloppyDisk />
            <h2 className="inline">Saved For Later</h2>
          </div>
          <div className="ml-4">
            <PaperPlane />
            <h2 className="inline">Published</h2>
          </div>
        </div>
      </div>

      <div className="flex min-h-[440px] my-12">
        <div className="flex-1 min-x-[340px] rounded-xl">
          {products.nodes.map((product) => (
            <div
              className="flex flex-row flex-1 p-4 bg-transparent hover:bg-[#F2FBFB] border border-transparent hover:border hover:border-solid hover:border-gray-200 hover:shadow-sm rounded-2xl hover:cursor-pointer"
              key={product.id}
              onClick={() => setShowUpdateForm(true)}
            >
              <div className="mr-4">
                <Image
                  alt={product.featuredImage?.altText || product.title}
                  src={product.featuredImage?.url || ''}
                  width={60}
                  height={60}
                  className="rounded-xl shadow-xl"
                />
              </div>
              <div className="flex flex-col flex-1 grow-[2]">
                <div>
                  <PaperPlane />
                  <h2 className="inline">{product.title}</h2>
                </div>
                <div>
                  <h2 className="">{product.description}</h2>
                  <div />
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-row justify-between">
            <div className="flex text-gray-400">
              <ChevronLeft />
              <p>Prev</p>
            </div>
            <p className="text-gray-400">Showing 5 of 16</p>
            <div className="flex">
              <p className="text-blue-400">Next</p>
              <ChevronRight />
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 rounded-2xl border-[2px] border-solid ml-24">
          {showUpdateForm ? (
            <>
              <div className="flex flex-col justify-between min-h-[140px] bg-[#F2FBFB] rounded-t-2xl p-8">
                <div>
                  <div className="flex justify-between">
                    <div>
                      <h2>Kids Winter Beanie Hat</h2>
                    </div>
                    <AlertCircle />
                  </div>
                  <p className="text-gray-500">
                    Some dummy description about the product can be viewed here.
                  </p>
                </div>

                <div className="flex justify-between">
                  <div>
                    <a
                      href="/products"
                      className="text-2xl text-center text-white rounded-xl bg-[#008080] hover:pointer py-4 px-8 w-full"
                    >
                      Generate
                    </a>
                  </div>

                  <div>
                    <button className="underline text-md text-center text-blue hover:pointer text-blue-500">
                      Mark As Reviewed
                    </button>
                    <button className="underline text-md text-center text-blue hover:pointer text-blue-500 ml-8">
                      Save For Later
                    </button>
                  </div>
                </div>
              </div>
              <div className="min-h-[300px] bg-[#FAFAFA] rounded-b-2xl border-t-[1px] py-8 px-16">
                <div className="flex justify-between">
                  <h2 className="text-2xl">Generated Results</h2>
                  <p className="text-gray-500">Showing 1 of 5 suggestions</p>
                </div>

                <div className="relative border border-blue-500 rounded-md p-12 mt-8 bg-white">
                  <p className="text-gray-500">
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white border border-gray-200 hover:shadow-md">
                      <div className="w-full h-full flex justify-center items-center">
                        <ChevronLeft />
                      </div>
                    </div>
                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white border border-gray-200 hover:shadow-md">
                      <div className="w-full h-full flex justify-center items-center">
                        <ChevronRight />
                      </div>
                    </div>
                    Click &quot;Generate&quot; button above to generate new
                    description suggestions.
                    <br />
                    <br />
                    You can edit suggestions using this text area. Click side
                    arrows to see next or previous suggestion. Once done click
                    &quot;Update Product&quot; to save changes.
                  </p>
                </div>

                <div className="flex justify-center">
                  <button
                    className="text-2xl text-center text-white rounded-xl bg-[#CCCCCC] hover:cursor-not-allowed py-4 px-8 mt-8"
                    disabled={true}
                  >
                    Update Product
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center bg-[#FAFAFA] rounded-t-2xl p-8 w-full h-full">
              <div className="flex flex-col items-center">
                <img src="assets/colorful-list.svg" width={100} height={100} />
                <p className="w-[180px] mt-8 text-gray-400">
                  Select a product from the list on the left to edit or generate
                  new product description.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const NEW_PRODUCTS_QUERY = /* GraphQL */ `
  query ProductsCollection {
    products(first: 5) {
      nodes {
        id
        title
        description
        featuredImage {
          altText
          url
        }
      }
    }
  }
`;
