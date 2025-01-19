import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function ReturnConfirmation({ confirmation, setConfirmation, textColor, borderColor }) {
  return (
    <button
      className={`w-full text-left transition-all duration-300 rounded-xl p-8 shadow-md
        ${confirmation ? `bg-white shadow-xl border-2 ${borderColor}` : 'bg-gray-50 hover:bg-white hover:shadow-lg'}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 md:transform transition-transform duration-300`}
      onClick={() => setConfirmation(!confirmation)}
    >
        <div className="flex items-center justify-between  mb-2">
          <h3 className="text-xl font-light">Confirmation</h3>
          <CheckCircleIcon className={`w-8 h-8 ${textColor}`} />
        </div>
        <p className="text-gray-500">
          Please confirm that the item/s you are returning to us have not been worn or used in any way, and as such are in brand new condition.
          If you have any doubts in this respect, please do contact us first.
        </p>
    </button>
  )
}