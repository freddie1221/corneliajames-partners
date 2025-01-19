import { makeGraphQLRequest } from './makeGraphQLRequest';
import getReturnQuery from '@/app/returns/lib/graphql/queries/getReturnQuery';
import mapReturn from '@/app/returns/lib/mappers/mapReturn';

export async function getReturn(id) {

  const query = getReturnQuery(id);
  const data = await makeGraphQLRequest(query);
  const returnData = mapReturn(data.return)

  return returnData
}

