# Assignment-3

Hosted Project: https://capable-youtiao-eea16c.netlify.app/

Assignment-3, Create a Dashboard/Landing Page to showcase "Top Gainers" & "Top Losers" in American Stock Market using API from https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo

Created a Dashboard component to showcase the result of the API.

Dashboard utilised Indicator component which is reused for both "Top Gainers" & "Top Losers", with `data` and `type` being the only two props.

Used Redux's provided `useSelector` & `dispatch` function to access data and call the API, using `fetchStock()` from actions `./src/actions/stockActions.js`.

The `fetchStock()` function call the API, using axios. Simultenously, also managing to call the slice's reducers as `fetchStockRequest()`, `fetchStocksSuccess()` & `fetchStocksFailure()` defined in the `./src/reducers/stockReducer.js`.

Slice is a combination of states and reducers, which helps tweaking the values of the state, and provide some action based on the state.

After successfully creating slice, actions and reducer, now all of this can be connected to a redux-store. And now the redux store could be provided directly to the main parent component to supply one single source of data(ideology: single source of truth) as prop.

Here, in `App.jsx` a `<Provider store={store}>` component is Wrapped around as a parent component to all the upcoming elements, supplying the store as prop to all upcomming element in the application.

