export default function ProductCard({ product }) {
  return (


    <div className="group cursor-pointer">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          alt={product.title}
          src={product.featuredImage?.url || 'No image available'}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div >

      <h1 className="mt-4 text-lg text-gray-700 mb-2">{product.title} — 
        <span className="text-sm"> MSRP £{parseFloat(product.priceRangeV2.maxVariantPrice.amount).toFixed(0)}</span>
      </h1>  
      
    </div>


  );
}