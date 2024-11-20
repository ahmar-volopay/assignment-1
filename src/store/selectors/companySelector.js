export const getName = (state) => state.company.Name;
export const getDesc = (state) => state.company.desc;
export const getAddress = (state) => state.company.address;
export const getCurrency = (state) => state.company.currency;
export const getExchange = (state) => state.company.exchange;
export const getSector = (state) => state.company.sector;
export const getWebsite = (state) => state.company.website;
export const getProfitMargin = (state) => state.company.profitMargin;
export const getWeekHigh52 = (state) => state.company.WeekHigh52;
export const getWeekLow52 = (state) => state.company.WeekLow52;
export const getEps = (state) => state.company.eps;

export const getAllCompanyData = (state) => state.company;