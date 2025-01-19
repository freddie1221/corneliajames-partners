'use client';

import { GiftIcon, CreditCardIcon, CheckCircleIcon } from '@heroicons/react/24/outline';


export default function ReturnOptions({ 
  setReturnType, 
  returnType, 
  itemsCount, 
  currencyCode,
  restockingFeeExplainer,
  exclusions,
  shippingService,
  shippingFee,
  taxDeduction,
  restockingFee,
  returnValue, 
  storeCreditValue
}) {

  return (
    <section>
      <h2 className="text-3xl font-light text-center mb-8 tracking-wide">Select Your Preferred Return Option</h2>
      
      <div className="flex flex-col gap-8"> 
        <StoreCreditOption 
          setReturnType={setReturnType} 
          returnType={returnType} 
          itemsCount={itemsCount} 
          currencyCode={currencyCode}
          storeCreditValue={storeCreditValue}
          shippingService={shippingService}
        />
        {returnType === "Credit" && (
          <BackButton setReturnType={setReturnType} />
        )}
        {returnType !== 'Credit' && !exclusions.alteration && (
          <RefundOption 
            setReturnType={setReturnType} 
            returnType={returnType} 
            itemsCount={itemsCount} 
            currencyCode={currencyCode} 
            shippingService={shippingService}
            
            returnValue={returnValue}
            taxDeduction={taxDeduction}
            shippingFee={shippingFee}
            restockingFee={restockingFee}
            restockingFeeExplainer={restockingFeeExplainer}
          />
        )}
      </div>
    </section>
  );
}

function StoreCreditOption({ 
  setReturnType, 
  returnType, 
  itemsCount, 
  currencyCode, 
  shippingService,
  storeCreditValue
}) {
  
  const benefits = [
    { text: `${currencyCode} ${(storeCreditValue).toFixed(2)} in store credit (10% bonus)`, highlighted: true },
    `Complimentary ${shippingService.text}`,
    'Instant credit upon submitting your return',
    'Shop straight away for the replacement items you would like, and receive them before shipping your originals back to us'
  ];
  
  return (
    <OptionCard
      type="Credit"
      isSelected={returnType === 'Credit'}
      setReturnType={setReturnType}
      borderColor="border-emerald-600"
      className="md:transform md:hover:scale-105 transition-transform duration-300"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-light mb-2">Instant Store Credit</h3>
            <div className="inline-block bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm">
              Recommended Choice
            </div>
          </div>
          <GiftIcon className={`w-8 h-8 ${returnType === 'Credit' ? 'text-emerald-600' : 'text-gray-400'}`} />
        </div>
        
        <BenefitsList benefits={benefits} />

        <div className="text-sm text-gray-600 space-y-2">
          <p>Items being returned: {itemsCount}</p>
          <p className="text-emerald-600 font-medium">Return shipping: Complimentary</p>
        </div>
      </div>
    </OptionCard>
  )
}

function RefundOption({ 
  setReturnType, 
  returnType, 
  itemsCount, 
  currencyCode, 
  restockingFeeExplainer, 

  
  restockingFee,
  taxDeduction,
  shippingFee,
  returnValue
}) {


  return (
    <OptionCard
      type="Refund"
      isSelected={returnType === 'Refund'}
      setReturnType={setReturnType}
      borderColor="border-navy"
      className=""
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-light mb-2">Return for Refund</h3>
            <div className="inline-block bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-sm">
              Standard Return
            </div>
          </div>
          <CreditCardIcon className={`w-8 h-8 ${returnType === 'Refund' ? 'text-navy' : 'text-gray-400'}`} />
        </div>

        <div className="space-y-2 text-gray-600">
          <div className="flex gap-2">
            <CheckCircleIcon className="w-5 h-5 text-navy flex-shrink-0" />
            <span className="font-medium text-navy">
              {`${currencyCode} ${(returnValue - restockingFee - taxDeduction - shippingFee).toFixed(2)} refund to original payment method`}
            </span>
          </div>
          {taxDeduction > 0 && (
            <div className="flex gap-2">
              <CheckCircleIcon className="w-5 h-5 text-navy flex-shrink-0" />
              <span className="font-medium">
             {`${currencyCode} ${taxDeduction.toFixed(2)} Duty & Tax is non-recoverable on your international order`}
              </span>
            </div>
          )}
          {restockingFee > 0 && (
            <div className="flex gap-2">
              <CheckCircleIcon className="w-5 h-5 text-navy flex-shrink-0" />
              <span className="font-medium">
                {`${restockingFeeExplainer}: ${currencyCode} ${restockingFee.toFixed(2)}`}
              </span>
            </div>
          )}
          <div className="flex gap-2">
            <CheckCircleIcon className="w-5 h-5 text-navy flex-shrink-0" />
            <span className="font-medium">
              Refund issued upon receipt & check of the returned items
            </span>
          </div>
        </div>
        

        <div className="text-sm text-gray-500 border-t border-gray-100 pt-4">
          <p className="mb-2">Items being returned: {itemsCount}</p>
          <p className="italic">You may choose to purchase a return label from us or use your preferred shipping service.</p>
        </div>
      </div>
    </OptionCard>
  );
}

function BenefitsList({ benefits, color = 'emerald-600' }) {
  return (
    <ul className="space-y-3">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex gap-2">
          <CheckCircleIcon className={`w-5 h-5 text-${color} flex-shrink-0`} />
          <span className={benefit.highlighted ? `font-medium text-${color}` : `text-gray-600`}>
            {typeof benefit === 'string' ? benefit : benefit.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function OptionCard({ type, children, isSelected, setReturnType, className, borderColor = 'border-emerald-600' }) {
  return (
    <button
      className={`w-full text-left transition-all duration-300 rounded-xl p-8 shadow-md
        ${isSelected ? `bg-white shadow-xl border-2 ${borderColor}` : `bg-gray-50 hover:bg-white hover:shadow-lg`}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 md:transform transition-transform duration-300
        ${className}`}
      onClick={() => setReturnType(type)}
    >
      {children}
    </button>
  );
}


function BackButton({ setReturnType }) {
  return (
    <button
      onClick={() => setReturnType("")}
      className="text-gray-600 hover:text-gray-800 font-medium"
    >← Back to options</button>
  )
}