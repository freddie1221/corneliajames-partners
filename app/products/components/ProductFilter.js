
export default function ProductFilter({ productTypes, selectedProductType, setSelectedProductType }) {
  return (
    
    <div className="flex flex-wrap justify-center mb-4">
      {productTypes.map(type => (
        <div key={type} 
          onClick={() => setSelectedProductType(type)} 
          className={`
            cursor-pointer
            p-2
            ${selectedProductType === type ? 'text-primCol font-bold' : 'text-gray-600'}
          `}>
          {type}
        </div>
      ))}
    </div>
  )
}