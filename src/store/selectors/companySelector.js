export const nameSelector = (state) => state.company.Name;
export const descSelector = (state) => state.company.desc;
export const addressSelector = (state) => state.company.address;
export const currencySelector = (state) => state.company.currency;
export const exchangeSelector = (state) => state.company.exchange;
export const sectorSelector = (state) => state.company.sector;
export const websiteSelector = (state) => state.company.website;
export const profitMarginSelector = (state) => state.company.profitMargin;
export const weekHigh52Selector = (state) => state.company.WeekHigh52;
export const weekLow52Selector = (state) => state.company.WeekLow52;
export const epsSelector = (state) => state.company.eps;

export const allCompanyDataSelector = (state) => state.company;
