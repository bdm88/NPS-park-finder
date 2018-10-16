'use strict'

function formatParameters(parameters){
    const queryItems = Object.keys(parameters)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`)
    return queryItems.join('&');
}

function getParks(stateSearch, maxResults){
    const searchUrl = 'https://api.nps.gov/api/v1/parks';
    const parameters = {
        stateCode: stateSearch.split(" ").join(""),
        limit: maxResults,
        api_key: 'AROjutF61qu2XCgKBqy7zs5etVdb6p4vazKgsp0v',
    };
    const queryString = formatParameters(parameters);
    const url = searchUrl + '?' + queryString;

    fetch(url)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayParks(responseJson))
        .catch(err => alert('Something went wrong.'));
}

function displayParks(responseJson){
    console.log(responseJson);
    for(let i = 0; i < responseJson.limit; i++){
        $('.searchResults').append(
            `<h3 class="resultList">${responseJson.data[i].fullName}</h3>
            <p class="resultList">${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].url}" class="resultList">${responseJson.data[i].url}</a>`
        )
    }
    $('.searchResults').removeClass('hidden');
}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        let stateSearch = $('input.stateSearch').val();
        let maxResults = $('input.maxResults').val();
        $('.resultList').remove();
        console.log(stateSearch);
        console.log(maxResults);
        getParks(stateSearch, maxResults);
    })
}

$(function(){
    console.log('App loaded!');
    watchForm();
  })