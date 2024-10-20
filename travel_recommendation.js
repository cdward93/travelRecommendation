// JavaScript Document
		// Define the cities and their corresponding timezones - checked w Moment() timezones for cities
		const cities = [
			{ city: 'Sydney', timezone: 'Australia/Sydney' },
			{ city: 'Melbourne', timezone: 'Australia/Melbourne' },
			{ city: 'Tokyo', timezone: 'Asia/Tokyo' },
			{ city: 'Kyoto', timezone: 'Asia/Kolkata' },
			{ city: 'Rio de Janeiro', timezone: 'America/Sao_Paulo' },
			{ city: 'São Paulo', timezone: 'America/Sao_Paulo' },
			{ city: 'Angkor Wat', timezone: 'Asia/Bangkok' }, // Note: Angkor Wat is in Cambodia, but uses the same timezone as Bangkok
			{ city: 'Taj Mahal', timezone: 'Asia/Kolkata' }, // Note: Taj Mahal is in India, which uses UTC+5.30 (IST)
			{ city: 'Bora Bora', timezone: 'Pacific/Tahiti' }, 
			{ city: 'Copacabana Beach', timezone: 'America/Sao_Paulo' }
		];
		

// makes dates and timezones global 
let date1, date2;
let tz1 = "";
let tz2 = "";


  function updateClock(clockId, timezone) {
	const clock = document.getElementById(clockId);
	if (clock) {
	  const date = moment().tz(timezone);
	  const formattedTime = date.format('YYYY-MM-DD HH:mm:ss A');
	  clock.textContent = formattedTime;
	  console.log("updateClocks: Formatted time: ", formattedTime);
	}
  }


//  make interval update object accessible
let intervalId;

function startClocks(tz1, tz2) {
   intervalId = setInterval( () => {
   date1 = moment().tz(tz1);
   date2 = moment().tz(tz2);
   const formattedTime1 = date1.format('YYYY-MM-DD HH:mm:ss A');

    document.getElementById("clock-1").textContent = formattedTime1;
    const formattedTime2 = date2.format('YYYY-MM-DD HH:mm:ss A');
	
    document.getElementById("clock-2").textContent = formattedTime2;
  }, 1000);
} 



function resetClocks() {
	clearInterval(intervalId);

	const nameElement1 = document.getElementById("name-1");
	const nameElement2 = document.getElementById("name-2");
  
	const city1 = nameElement1.textContent.split(",")[0];
	const city2 = nameElement2.textContent.split(",")[0];
  
	for (let i = 0; i < cities.length; i++) {
	  if (cities[i].city === city1) tz1 = cities[i].timezone;
	  if (cities[i].city === city2) tz2 = cities[i].timezone;
	}

	date1 = moment();
	date2 = moment();
  
	// Update the clocks with the extracted timezones
	startClocks(tz1, tz2);
  }


document.getElementById("reset-btn").addEventListener("click", () => {
	const descriptionElement =  document.getElementById("description-1");
	descriptionElement.textContent = "";
	const descriptionElement2 =  document.getElementById("description-2");
	descriptionElement2.textContent = "";
	document.getElementById("image-1").src = "images/prompt_to_search_transparent.png";
	document.getElementById("name-1").textContent = "";
	document.getElementById("image-2").src = "images/prompt_to_search_transparent.png";
	document.getElementById("name-2").textContent = "";
    resetClocks();

} );

document.addEventListener("DOMContentLoaded", function() {
   const searchButton = document.getElementById("search-btn");
   const searchInput = document.getElementById("search-input");

	
	
	
	
	
	

  	
	
	
	
   searchButton.addEventListener("click", () => {
		fetch("./travel_recommendation_api.json")
		   .then(response => response.json())
		   .then(data => { 
              const searchTerm = document.getElementById("search-input").value.toLowerCase();

			   console.log(data);
               console.log(searchTerm);
			   console.log(cities);
			
			if (searchTerm === "countries" || searchTerm === "country" || searchTerm === "brazil" || searchTerm === "australia" || searchTerm === "japan") {
			   const countryData = data.countries;
			   let id1 = Math.floor(Math.random() * countryData.length);
			   if (searchTerm === "brazil") id1 = 2;
			   if (searchTerm === "japan") id1 = 1;
			   if (searchTerm === "australia") id1 = 0;


//			   console.log("Found countries... id1 is "+id1); - some debug
				
//			   console.log("image-1: ",countryData[id1].cities[0].imageUrl);
//			   console.log("name-1: ",countryData[id1].cities[0].name);
//			   console.log("desc-1: ",countryData[id1].cities[0].description);
//			   console.log("image-2: ",countryData[id1].cities[1].imageUrl);
//			   console.log("name-2: ",countryData[id1].cities[1].name);
//			   console.log("desc-2: ",countryData[id1].cities[1].description);

			   const descriptionElement =  document.getElementById("description-1");
			   descriptionElement.textContent =countryData[id1].cities[0].description;
			   const descriptionElement2 =  document.getElementById("description-2");
			   descriptionElement2.textContent =countryData[id1].cities[1].description;
// setting a tmp var (descriptionElement) is for some reason required - the following is *trying to set null val error*
// document.getElementById("desciption-1").textContent = countryData[id1].cities[0].description;		   
	//		   document.getElementById("desciption-2").textContent = countryData[id1].cities[1].description;  --> no good

               document.getElementById("image-1").src = countryData[id1].cities[0].imageUrl;
			   document.getElementById("name-1").textContent = countryData[id1].cities[0].name;
	//		  
			   document.getElementById("image-2").src = countryData[id1].cities[1].imageUrl;
			   document.getElementById("name-2").textContent = countryData[id1].cities[1].name;
	           const locale1 = countryData[id1].cities[0].name.split(",")[0];
		       const locale2 =  countryData[id1].cities[1].name.split(",")[0];

			   for (let i = 0; i < cities.length; i++) { // search cities list - set timezones
		        	if (cities[i].city === locale1) tz1 = cities[i].timezone;
		            if (cities[i].city === locale2) tz2 = cities[i].timezone;
		        }


            	// Update the clock every second
	           setInterval(updateClock, 1000, "clock-1", tz1);
	           setInterval(updateClock, 1000, "clock-2",  tz2); 


          }
	
	
	       else if (searchTerm === "temple" || searchTerm === "temples") {
			   const templeData = data.temples;
			   const id1 = 0;  // these ended up just hardcoded
			   const id2 = 1;
			   
			   const descriptionElement = document.getElementById("description-1");
			   descriptionElement.textContent =templeData[id1].description;
			   document.getElementById("image-1").src = templeData[id1].imageUrl;
			   document.getElementById("name-1").textContent = templeData[id1].name;
			   const descriptionElement2 = document.getElementById("description-2");
			   descriptionElement2.textContent =templeData[id2].description;	
		   
			   document.getElementById("image-2").src = templeData[id2].imageUrl;
			   document.getElementById("name-2").textContent = templeData[id2].name;
	           const locale1 = templeData[id1].name.split(",")[0];
               const locale2 = templeData[id2].name.split(",")[0];
	
			   for (let i = 0; i < cities.length; i++) {
				   if (cities[i].city === locale1) tz1 = cities[i].timezone; 
				   if (cities[i].city === locale2) tz2 = cities[i].timezone;
				}

				setInterval(updateClock, 1000, "clock-1", tz1);
				setInterval(updateClock, 1000, "clock-2",  tz2); 
			


			   }
		
	
	       else if (searchTerm === "beach" || searchTerm === "beaches") {
			   const beachData = data.beaches;
			   const id1 = 0;
			   const id2 = 1;
		
			   const descriptionElement =  document.getElementById("description-1");   // directly setting doesn't work
			   descriptionElement.textContent = beachData[id1].description;
			   const descriptionElement2 =  document.getElementById("description-2");
			   descriptionElement2.textContent = beachData[id2].description;

			   document.getElementById("image-1").src = beachData[id1].imageUrl;
			   document.getElementById("name-1").textContent = beachData[id1].name;
						
			   document.getElementById("image-2").src = beachData[id2].imageUrl;
			   document.getElementById("name-2").textContent = beachData[id2].name;
               const locale1 = beachData[id1].name.split(",")[0];
               const locale2 =  beachData[id2].name.split(",")[0];
             
			   for (let i = 0; i < cities.length; i++) {
	               if (cities[i].city === locale1) tz1 = cities[i].timezone; 
                   if (cities[i].city === locale2) tz2 = cities[i].timezone;
                }

             setInterval(updateClock, 1000, "clock-1", tz1); 
             setInterval(updateClock, 1000, "clock-2",  tz2); 


}
		
    
          else console.log("Unrecognized search query");
 
    }  )    .catch(error => {
        console.error('Error fetching the JSON file:', error);
      });

	  startClocks(tz1, tz2);
	  
     }  ) } );



