

export default function calculateRestockingFee({returnType, itemsCount}) {
  let fee = 0;
  let explainer = ""

  if(returnType === 'Credit') {
    fee = 100;

  } else if (itemsCount > 3) {
    fee = 20;
    explainer = "20% restocking fee for more than 3 items"

  } else if (itemsCount > 1) {
    fee = 10;
    explainer = "10% restocking fee for 2-3 items"
  }
  return {fee, explainer, feePercentage: fee / 100}
}