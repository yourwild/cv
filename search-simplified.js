/* global instantsearch algoliasearch */

app({
  appId: '7O9Y5G0LMW',
  apiKey: '2d64292d403e04ab8600d563cf4f1984',
  indexName: 'MarkV_David_Wild_CV',
  indexName2: 'ApplicationExperience',
  searchParameters: {
    hitsPerPage: 10,
  },
});

function app(opts) {
  const search = instantsearch({
    searchClient: algoliasearch(opts.appId, opts.apiKey),
    indexName: opts.indexName,
    routing: true,
    searchFunction: opts.searchFunction,
  });

  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: '#search-input',
      placeholder: 'Explore professional experience',
    }),
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results'),
      },
    }),
    instantsearch.widgets.stats({
      container: '#stats',
    }),
    instantsearch.widgets.sortBy({
      container: '#sort-by',
      items: [
        {
          value: opts.indexName,
          label: 'Work',
        },
        {
          value: opts.indexName2,
          label: 'Application',
        },
      ],
    }),
    instantsearch.widgets.pagination({
      container: '#pagination',
      scrollTo: '#search-input',
    }),
    instantsearch.widgets.refinementList({
      container: '#category',
      attribute: 'CATEGORY',
      operator: 'or',
      templates: {
        header: getHeader('Category'),
      },
    }),
    instantsearch.widgets.refinementList({
      container: '#Company',
      attribute: 'COMPANY',
      operator: 'or',
      templates: {
        header: getHeader('Company'),
      },
    }),
    instantsearch.widgets.refinementList({
      container: '#cvtype',
      attribute: 'CV_Type',
      operator: 'or',
      searchForFacetValues: {
        placeholder: 'Search for brands',
        templates: {
          noResults: '<div class="sffv_no-results">No matching brands.</div>',
        },
      },
      templates: {
        header: getHeader('Brand'),
      },
    }),
    instantsearch.widgets.rangeSlider({
      container: '#year',
      attribute: 'CONCLUDE YEAR',
      templates: {
        header: getHeader('Year'),
      },
    }),
    instantsearch.widgets.refinementList({
      container: '#type',
      attribute: 'type',
      operator: 'and',
      templates: {
        header: getHeader('Type'),
      },
    }),
  ]);

  search.start();
}

function getTemplate(templateName) {
  return document.querySelector(`#${templateName}-template`).innerHTML;
}

function getHeader(title) {
  return `<h5>${title}</h5>`;
}
