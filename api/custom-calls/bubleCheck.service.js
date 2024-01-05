const axios = require("axios");

const getArticle = async (text) => {
  try {
    const generateContent = {
      method: 'get',
      url: `https://help.cleanpower.global/version-test/api/1.1/obj/aritculos`,
    };

    const axiosResult = await axios(generateContent);

    const mappedResults = axiosResult.data.response.results.map(article => (
      article.Titulo
    ));

    return mappedResults;

  } catch (e) {
    console.error('Error getting:', e);
    throw e;
  }
};


const getAllArticles = async () => {
  try {
    const allArticles = [];

    let cursor = 0;
    let remaining = 1; // Initialize remaining to a non-zero value to enter the loop

    while (remaining > 0) {
      const generateContent = {
        method: 'get',
        url: `https://help.cleanpower.global/version-test/api/1.1/obj/aritculos?cursor=${cursor}`,
      };

      const axiosResult = await axios(generateContent);

      const results = axiosResult.data.response.results;

      // Append the current page of results to the array
      allArticles.push(...results.map(article => article.Titulo));

      // Update cursor and remaining for the next request
      cursor += 100;
      remaining = axiosResult.data.response.remaining;
    }

    return allArticles;

  } catch (e) {
    console.error('Error getting articles:', e);
    throw e;
  }
};



module.exports = { getArticle, getAllArticles };


