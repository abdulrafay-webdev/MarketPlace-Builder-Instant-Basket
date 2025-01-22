'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { client } from '../../../sanity/lib/client';
import iProduct from '@/types/product';
import ProductList from '@/components/shared/ProductList';

const SearchPage = () => {
  const [products, setProducts] = useState<iProduct[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        const data = await client.fetch(`*[_type == "product" && "${query}" in name || description match "${query}"]{
          name,
          description,
          price,
          "categoryName": category->categoryName,
          sku,
          "slug": slug.current,
          "ProductImage": image.asset->url,
          _id,
          quantity
        }`);
        
        setProducts(data);
      };

      fetchData();
    }
  }, [query]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Search Results
        </h1>

        {/* Search Query Section */}
        <div className="text-center text-lg text-gray-700 mb-6">
          <p>
            Results for <span className="font-semibold text-black">{query || 'No query found'}</span>
          </p>
        </div>

        {/* Product List Section */}
        <div className="container">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
