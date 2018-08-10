const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

cities = {};
cities = [
  {
      "city": "New York", 
      "growth_from_2000_to_2013": "4.8%", 
      "latitude": 40.7127837, 
      "longitude": -74.0059413, 
      "population": "8405837", 
      "rank": "1", 
      "state": "New York"
  }, 
  {
      "city": "Los Angeles", 
      "growth_from_2000_to_2013": "4.8%", 
      "latitude": 34.0522342, 
      "longitude": -118.2436849, 
      "population": "3884307", 
      "rank": "2", 
      "state": "California"
  }, 
  {
      "city": "Chicago", 
      "growth_from_2000_to_2013": "-6.1%", 
      "latitude": 41.8781136, 
      "longitude": -87.6297982, 
      "population": "2718782", 
      "rank": "3",
      "state": "Illinois"
  },
  {
      "city": "Houstoasyncn", 
      "growth_from_2000_to_2013": "11.0%", 
      "latitude": 29.7604267, 
      "longitude": -95.3698028, 
      "population": "2195914", 
      "rank": "4", 
      "state": "Texas"
  }, 
  {
      "city": "Philadelphia", 
      "growth_from_2000_to_2013": "2.6%", 
      "latitude": 39.9525839, 
      "longitude": -75.1652215, 
      "population": "1553165", 
      "rank": "5", 
      "state": "Pennsylvania"
  }, 
  {
      "city": "Phoenix", 
      "growth_from_2000_to_2013": "14.0%", 
      "latitude": 33.4483771, 
      "longitude": -112.0740373, 
      "population": "1513367", 
      "rank": "6", 
      "state": "Arizona"
  }, 
  {
      "city": "San Antonio", 
      "growth_from_2000_to_2013": "21.0%", 
      "latitude": 29.4241219, 
      "longitude": -98.49362819999999, 
      "population": "1409019", 
      "rank": "7", 
      "state": "Texas"
  }, 
  {
      "city": "San Diego", 
      "growth_from_2000_to_2013": "10.5%", 
      "latitude": 32.715738, 
      "longitude": -117.1610838, 
      "population": "1355896", 
      "rank": "8", 
      "state": "California"
  }, 
  {
      "city": "Dallas", 
      "growth_from_2000_to_2013": "5.6%", 
      "latitude": 32.7766642, 
      "longitude": -96.79698789999999, 
      "population": "1257676", 
      "rank": "9", 
      "state": "Texas"
  }, 
  {
      "city": "San Jose", 
      "growth_from_2000_to_2013": "10.5%", 
      "latitude": 37.3382082, 
      "longitude": -121.8863286, 
      "population": "998537", 
      "rank": "10", 
      "state": "California"
  }, 
  {
      "city": "Austin", 
      "growth_from_2000_to_2013": "31.7%", 
      "latitude": 30.267153, 
      "longitude": -97.7430608, 
      "population": "885400", 
      "rank": "11", 
      "state": "Texas"
  }, 
  {
      "city": "Indianapolis", 
      "growth_from_2000_to_2013": "7.8%", 
      "latitude": 39.768403, 
      "longitude": -86.158068, 
      "population": "843393", 
      "rank": "12", 
      "state": "Indiana"
  }, 
  {
      "city": "Jacksonville", 
      "growth_from_2000_to_2013": "14.3%", 
      "latitude": 30.3321838, 
      "longitude": -81.65565099999999, 
      "population": "842583", 
      "rank": "13", 
      "state": "Florida"
  }, 
  {
      "city": "San Francisco", 
      "growth_from_2000_to_2013": "7.7%", 
      "latitude": 37.7749295, 
      "longitude": -122.4194155, 
      "population": "837442", 
      "rank": "14", 
      "state": "California"
  }, 
  {
      "city": "Columbus", 
      "growth_from_2000_to_2013": "14.8%", 
      "latitude": 39.9611755, 
      "longitude": -82.99879419999999, 
      "population": "822553", 
      "rank": "15", 
      "state": "Ohio"
  }, 
  {
      "city": "Charlotte", 
      "growth_from_2000_to_2013": "39.1%", 
      "latitude": 35.2270869, 
      "longitude": -80.8431267, 
      "population": "792862", 
      "rank": "16", 
      "state": "North Carolina"
  }, 
  {
      "city": "Fort Worth", 
      "growth_from_2000_to_2013": "45.1%", 
      "latitude": 32.7554883, 
      "longitude": -97.3307658, 
      "population": "792727", 
      "rank": "17", 
      "state": "Texas"
  }, 
  {
      "city": "Detroit", 
      "growth_from_2000_to_2013": "-27.1%", 
      "latitude": 42.331427, 
      "longitude": -83.0457538, 
      "population": "688701", 
      "rank": "18", 
      "state": "Michigan"
  }, 
  {
      "city": "El Paso", 
      "growth_from_2000_to_2013": "19.4%", 
      "latitude": 31.7775757, 
      "longitude": -106.4424559, 
      "population": "674433", 
      "rank": "19", 
      "state": "Texas"
  }
];

function search(value) {
  return new Promise( (accept, reject) => 
  {
    const result = cities.filter( ({ city, state }) => {
      return (city.indexOf(value) !== -1 || state.indexOf(value) !== -1);
    })
    accept(result);
  });
};

async function handleInput() {
  let list = [];
  if (this.value !== "") {
    const results = await search(this.value);
    list = results.map( place => `<li>${place.city}
    <span class="population">${place.population}</span>
    </li>`);
  } else {
  list = ['<li>Filter <mark>for</mark> a city</li>', '<li>or a state</li>'];
  }

  const suggestions = document.querySelector('.suggestions');
  suggestions.innerHTML = list.join('');
}

const searchField = document.querySelector('.search');
searchField.addEventListener('input', handleInput);