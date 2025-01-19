import { PaperAirplaneIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function ReturnShipping({ shippingService, includeShipping, setIncludeShipping, currencyCode }) {

  const benefits = [
    {text: `${shippingService.text} Label: ${currencyCode} ${shippingService.fee.toFixed(2)}`, highlighted: true},
    shippingService.explainer
  ]
  
  return (
    <button
      className={`w-full text-left transition-all duration-300 rounded-xl p-8 shadow-md
        ${includeShipping ? 'bg-white shadow-xl border-2 border-navy' : 'bg-gray-50 hover:bg-white hover:shadow-lg'}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 md:transform transition-transform duration-300`}
      onClick={() => setIncludeShipping(!includeShipping)}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-light mb-2">Include Return Shipping Label</h3>
          <PaperAirplaneIcon className={`w-8 h-8 ${includeShipping ? 'text-navy' : 'text-gray-400'}`} />
        </div>
        <BenefitsList benefits={benefits} color="navy" />
      </div>
    </button>
  )
}


function BenefitsList({ benefits, color = 'emerald-600' }) {
  return (
    <ul className="space-y-3">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex  gap-2">
          <CheckCircleIcon className={`w-5 h-5 text-${color} flex-shrink-0`} />
          <span className={benefit.highlighted ? `font-medium text-${color}` : `text-gray-600`}>
            {typeof benefit === 'string' ? benefit : benefit.text}
          </span>
        </li>
      ))}
    </ul>
  );
}