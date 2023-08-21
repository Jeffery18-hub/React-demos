const BASE_URL = 'http://localhost:3001';

const fetcher = async (url) => {
    let responseObject = { errorMessage: '', data: [] };

  try {
    const response = await fetch(BASE_URL + url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const responseData = await response.json();
    console.log(url);
    console.log(responseData);

    responseObject.errorMessage = '';
    responseObject.data = responseData;

    return responseObject;
  }
  catch (err) {
    responseObject.errorMessage = err.message;
    return responseObject;
  }
}

export const fetchCategories = () => {
    return fetcher('/categories');
}

export const fetchProducts = (id) => {
    return fetcher('/products?catId='+ id);
}

export const fetchProductById = (id) => {
    return fetcher('/products/'+ id);
}

export const fetchProductsByQuery = (query) => {
    return fetcher('/products?q='+ query);
}