import SearchResult from './searchResult';

const SEARCH_TITLE = 'TERM';
const SEARCH_DESCRIPTION = 'This term is a very good term, and the explanation is great as well.';

const getSearchResult = (title = SEARCH_TITLE, description = SEARCH_DESCRIPTION) => {
    return new SearchResult('id', 'term', title, description, []);
};

test('hit score is 1 if term is exact same as search string', () => {
    expect(getSearchResult().hitScore(SEARCH_TITLE)).toBe(1);
});

test('hit score is 0.95 if header starts with query and it exists in description', () => {
    expect(getSearchResult('Dette er', 'Noe ok er dette').hitScore('dette')).toBe(0.95);
});

test('hit score is 0.9 if header starts with query', () => {
    expect(getSearchResult('Dette er', 'Noe ok er').hitScore('dette')).toBe(0.9);
});

test('hit score is 0.7 - 0.9 if hits in title and description', () => {
    expect(getSearchResult('Dette er', 'Noe ok er').hitScore('er')).toBeGreaterThanOrEqual(0.7);
    expect(getSearchResult('Dette er', 'Noe ok er').hitScore('er')).toBeLessThanOrEqual(0.9);
});

test('hit score is 0.6 - 0.7 if hits in title', () => {
    expect(getSearchResult('Dette er', 'Noe ok').hitScore('er')).toBeGreaterThanOrEqual(0.6);
    expect(getSearchResult('Dette er', 'Noe ok').hitScore('er')).toBeLessThanOrEqual(0.7);
});

test('hit score is 0.5 - 0.6 if hits in description', () => {
    expect(getSearchResult('Dette', 'Noe ok er').hitScore('er')).toBeGreaterThanOrEqual(0.5);
    expect(getSearchResult('Dette', 'Noe ok er').hitScore('er')).toBeLessThanOrEqual(0.6);
});
