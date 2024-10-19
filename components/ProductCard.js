export default function ProductCard({ product }) {
  
  const msrp = parseFloat(product.priceRangeV2.maxVariantPrice.amount).toFixed(2);
  const wholesale = parseFloat(msrp * 0.46).toFixed(2);
  
  return (

    <div className="group cursor-pointer">
      <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          alt={product.title}
          src={product.featuredImage?.url || 'No image available'}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
        <div className="flex flex-row justify-between bg-gray-900 bg-opacity-80 text-white p-2 absolute bottom-0 w-full backdrop-filter backdrop-blur-sm">
          <span className="heading text-lg text-white">{product.title}</span>
        </div>
      </div >
      <div className="flex flex-row justify-between text-sm w-full p-2">
        <span>MSRP £{msrp}</span>
        <span>Wholesale £{wholesale}</span>
      </div>
    </div>


  );
}