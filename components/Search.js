import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_ONLY_API_KEY);

const Hit = ({ hit }) => (
  <div>
    <h2>{hit.title}</h2>
    <p>{hit.description}</p>
  </div>
);

export default function Search() {
  return (
    <InstantSearch searchClient={searchClient} indexName="your_index_name">
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
}