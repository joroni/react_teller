// Imports

const Homepage = Scrivito.provideObjClass('Homepage', {
  attributes: {
    ...defaultPageAttributes,
    showAsLandingPage: ['enum', { values: ['yes', 'no'] }],
    childOrder: 'referencelist',
    footer: ['widgetlist', { only: 'SectionWidget' }],
    logoDark: 'reference',
    logoWhite: 'reference',
    dividerLogo: 'reference',
    facebookAppId: 'string',
    twitterSite: 'string',
    googleMapsApiKey: 'string',
    sidebar: 'widgetlist',      /* ⬅ */
    ...metaDataAttributes,
  },
});