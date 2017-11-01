

var myKey = "8a06cf38-dfd7-425d-8c5a-d4fe28d63a10";
var month_text = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var day_text = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var numberOfYears = 0;
var numberOfMonths = 0;

var mostrar = function(){

	var startDate = new Date(document.getElementById('startDate').value);
	var numberOfDays = parseInt(document.getElementById('numberOfDays').value);
	var countryCode = document.getElementById('countryCode').value;

	endDate = new Date();
	endDate = addDays(startDate , numberOfDays); 


	numberOfYears = endDate.getFullYear() - startDate.getFullYear();


	if (endDate.getMonth() > startDate.getMonth() )
		numberOfMonths = endDate.getMonth() - startDate.getMonth();
	else
		if (numberOfYears > 0) 
			numberOfMonths = 12 - startDate.getMonth() + endDate.getMonth() ;
		else
			numberOfMonths = endDate.getMonth() - startDate.getMonth()  ;

	numberOfMonths++;

	

	var dtoday = new Date();
	dtoday = addDays(startDate , 1);

	


  var monthStart = 0;
  


	do {

		let monthActual = dtoday.getMonth() + 1;
		
		

		if (monthStart != monthActual)
			{
				console.log('cabecera');
				monthStart = monthActual;
				
				let month = document.createElement("DIV");
				month.className = "month";
				document.body.appendChild(month);

				let table_month = document.createElement("TABLE");
				table_month.className = "table_month";
				month.appendChild(table_month);

				let title = document.createElement("CAPTION");
				title.className = "title";
				title.innerText = month_text[monthActual - 1];
				table_month.appendChild(title);


				let header = document.createElement("THEAD");
				table_month.appendChild(header);

				let row = document.createElement("TR");
				header.appendChild(row);

				for (d = 0; d < 7; d++) {
				    let day = document.createElement("TH");
				    day.innerText = day_text[d];
				    row.appendChild(day);
				}


				var body = document.createElement("TBODY");
				table_month.appendChild(body);			
			}


		let row = document.createElement("TR");
		body.appendChild(row);

	    for (d = 0; d < 7; d++) {
	        let day = document.createElement("TD");
	        day.className="weekday";

	        if ( dtoday.getDay()  % 7 == d && dtoday <= endDate && (dtoday.getMonth() + 1) == monthStart )
	        	{
	        		
	        		
	        		if (d==0 || d ==6)
	        			day.className="weekend";
	        		
	        		if(isDateAHoliday(dtoday.getFullYear(), dtoday.getMonth()+1, dtoday.getDate(), countryCode))
	        			day.className="holiday";

	        		day.innerText = dtoday.getDate() ;					        		
					
					dtoday = addDays(dtoday , 1);
					
	        	}
	        else
	       		{
		        	day.className="invalidday";
		        	day.innerText = "";						        	
		        }

	        row.appendChild(day);
     
		} 



	} while(dtoday <= endDate)

}


function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function isDateAHoliday(y, m, d, country) {
	

    var jsonURL = "https://holidayapi.com/v1/holidays?key="+myKey+"&country='"+country+"'&year=" + y + "&month=" + m + "&day=" + d;
   
    var isAHoliday = false;

    $.getJSON(jsonURL, function (data) {
    	
        // If the date is a holiday
        if (data.holidays.length > 0) {
         
            isAHoliday = true;
           
        }
     
        return isAHoliday;
    });
}


