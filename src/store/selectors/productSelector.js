export const titleSelector = (state) =>
    state.product.products?.map((product) => product.title) || [];

export const categorySelector = (state) =>
    state.product.products?.map((product) => product.category) || [];

export const priceSelector = (state) =>
    state.product.products?.map((product) => product.price) || [];

export const ratingSelector = (state) => 
    state.product.products?.map((product) => product.rating) || [];

export const stockSelector = (state) => 
    state.product.products?.map((product) => product.stock) || [];

export const totalSelector = (state) => state.product.total ;

