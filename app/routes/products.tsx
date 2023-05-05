import {useState} from 'react';
import {useLoaderData} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {LoaderArgs, defer} from '@shopify/remix-oxygen';
import {GraphDataQuery, ProductsCollectionQuery} from 'gql/graphql';
import {AlertCircle} from '../icons/AlertCircle';
import {ArrowLeft} from '../icons/ArrowLeft';
import {CheckmarkCircle} from '../icons/CheckmarkCircle';
import {ChevronLeft} from '../icons/ChevronLeft';
import {ChevronRight} from '../icons/ChevronRight';
import {FloppyDisk} from '../icons/FloppyDisk';
import {PaperPlane} from '../icons/PaperPlane';
import {ProductStatusIcon} from '../icons/ProductStatusIcon';

export function meta() {
  return [
    {title: 'Fancy Store'},
    {description: 'A custom storefront powered by Hydrogen'},
  ];
}

export async function loader({context}: LoaderArgs) {
  const products = await context.storefront.query<ProductsCollectionQuery>(
    NEW_PRODUCTS_QUERY,
  );
  return {products};
}

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
type Product = ArrayElement<ProductsCollectionQuery['products']['nodes']>;

export default function Index() {
  const [formData, setFormData] = useState<Product>(null!);
  const {products} = useLoaderData<typeof loader>();

  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const onSetFilter = (newFilter: string) => {
    if (filter === newFilter) setFilter('');
    else setFilter(newFilter);
    setPage(1);
  };
  const onShowUpdateForm = (product: Product) => {
    setFormData(product);
  };

  const items = filter
    ? products.products.nodes.filter((node) => node.tags[0] === filter)
    : products.products.nodes;
  const paginatedItems = items.slice(5 * (page - 1), 5 * page);

  return (
    <div className="flex flex-col">
      <div className="md:flex md:flex-row md:justify-between">
        <div className="flex items-center">
          <a href="/">
            <ArrowLeft />
          </a>
          <h1 className="inline ml-4">All Products</h1>
        </div>

        <div className="md:flex md:flex-row text-[#999999]">
          <div className="flex items-center">
            <h2>Filter by:</h2>
          </div>
          {['Not Started Yet', 'Reviewed', 'Saved For Later', 'Published'].map(
            (tag) => (
              <div
                className="ml-4 flex items-center hover:cursor-pointer"
                key={tag}
                onClick={() => onSetFilter(tag)}
              >
                <ProductStatusIcon
                  tag={tag}
                  disabled={tag !== filter}
                  withText={true}
                />
              </div>
            ),
          )}
        </div>
      </div>

      <div className="md:flex min-h-[440px] my-12">
        <div className="md:flex-1 min-x-[340px] rounded-xl">
          {paginatedItems.map((product) => (
            <div
              className="flex flex-row flex-1 p-4 bg-transparent hover:bg-[#F2FBFB] border border-transparent hover:border hover:border-solid hover:border-gray-200 hover:shadow-sm rounded-2xl hover:cursor-pointer"
              key={product.id}
              onClick={() => onShowUpdateForm(product)}
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
                <div className="flex items-center">
                  <ProductStatusIcon tag={product.tags[0]} />
                  <h2 className="inline">{product.title}</h2>
                </div>
                <div>
                  <h2 className="text-[#666666]">{product.description}</h2>
                  <div />
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-row justify-between mt-4">
            <button
              className="flex items-center hover:curser-pointer enabled:text-blue-400 disabled:text-gray-400"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft />
              <p>Prev</p>
            </button>

            <p className="text-gray-400">
              Showing {paginatedItems.length} of {items.length}
            </p>

            <button
              className="flex items-center hover:curser-pointer enabled:text-blue-400 disabled:text-gray-400"
              onClick={() => setPage(page + 1)}
              disabled={5 * page >= items.length}
            >
              <p>Next</p>
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="mt-12 md:mt-0 flex flex-col md:flex-1 rounded-2xl border-[2px] border-solid ml-0 md:ml-24">
          {formData ? (
            <>
              <div className="flex flex-col justify-between min-h-[140px] bg-[#F2FBFB] rounded-t-2xl p-8">
                <div>
                  <div className="flex justify-between">
                    <div>
                      <h2>{formData.title}</h2>
                    </div>
                    <ProductStatusIcon tag={formData.tags[0]} />
                  </div>
                  <p className="text-gray-500 mt-4">{formData.description}</p>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between mt-8">
                  <div className="w-full md:w-auto">
                    <a
                      href="/products"
                      className="text-2xl text-center text-white rounded-xl bg-[#008080] hover:pointer py-4 px-8 w-full"
                    >
                      Generate
                    </a>
                  </div>

                  <div className="flex flex-col md:flex-row mt-8 md:mt-0 items-end">
                    <button className="underline text-md text-center text-blue hover:pointer text-blue-500">
                      Mark As Reviewed
                    </button>
                    <button className="underline text-md text-center text-blue hover:pointer text-blue-500 mt-4 md:mt-0 md:ml-8">
                      Save For Later
                    </button>
                  </div>
                </div>
              </div>

              <div className="min-h-[300px] bg-[#FAFAFA] rounded-b-2xl border-t-[1px] py-8 px-16">
                <div className="flex flex-col md:flex-row justify-between">
                  <h2 className="text-2xl">Generated Results</h2>
                  <p className="text-gray-500">Showing 1 of 5 suggestions</p>
                </div>

                <div className="relative border border-blue-500 rounded-md p-12 my-8 bg-white">
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

                <div className="flex justify-center w-full">
                  <button
                    className="text-2xl text-center text-white rounded-xl bg-[#CCCCCC] hover:cursor-not-allowed py-4 px-8"
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
    products(first: 200) {
      nodes {
        id
        title
        description
        tags
        featuredImage {
          altText
          url
        }
      }
    }
  }
`;
