import { createSelector } from "@reduxjs/toolkit";

const getDesc = (state) => state.company.desc;
const getAddress = (state) => state.company.address;
const getCurrency = (state) => state.company.currency;
const getExchange = (state) => state.company.exchange;
const getSector = (state) => state.company.sector;
const getWebsite = (state) => state.company.website;
const profitMargin = (state) => state.company.profitMargin;
const getWeekHigh52 = (state) => state.company.WeekHigh52;
const getWeekLow52 = (state) => state.company.WeekLow52;
const getEps = (state) => state.company.eps;