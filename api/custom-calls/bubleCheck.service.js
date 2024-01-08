const axios = require("axios");

const fs = require('fs');
const os = require('os');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


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
      allArticles.push(...results.map(article => ({ tittle: article.Titulo, id: article._id })));

      // Update cursor and remaining for the next request
      cursor += 100;
      remaining = axiosResult.data.response.remaining;
    }

    const path = `${process.cwd()}/tmp/allArticles.csv`;

    // Save the result in a CSV file
    const csvWriter = createCsvWriter({
      path: path,
      header: [
        { id: 'tittle', title: 'TITTLE' },
        { id: 'id', title: 'ID' },
      ]
    });

    csvWriter
      .writeRecords(allArticles)
      .then(() => console.log('The CSV file was written successfully'));

    return allArticles;

  } catch (e) {
    console.error('Error getting articles:', e);
    throw e;
  }
};



module.exports = { getArticle, getAllArticles };


