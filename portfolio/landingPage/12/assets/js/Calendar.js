var current = 
{
	'year':  new Date().getFullYear(),
	'month': new Date().getMonth() + 1,
	'date':  new Date().getDate()
};

var choose = 
{
	'year':  current.year,
	'month': current.month,
	'date':  current.date,
	'hour':  0,
	'minute':0
};
$(function()
{
	drawCalendar(current);
	$('#calendar tbody').on({click: function()
	{		
		$('#calendar tbody td.selected').removeClass('selected');
		
		choose.date = parseFloat($(this).text());		
		$(this).addClass('selected');
		showList();
		calendarfulldate = choose.year+"/"+choose.month+"/"+choose.date;			
	}}, "td");
	
	$('#lastMonth').click(function(){changeMonth(-1)});
	$('#year').click(     function(){changeMonth(0)});	//back to current year
	$('#nextMonth').click(function(){changeMonth(1)});
	
	$('#hourText').change( function() {setTimeRange (this, $(this).val());});
	$('#hourRange').change(function() {setTimeNumber(this, $(this).val());});
	
	$('#minuteText').change( function() {setTimeRange (this, $(this).val());});
	$('#minuteRange').change(function() {setTimeNumber(this, $(this).val());});
});

function changeMonth(changeRange)
{
	choose.month = (changeRange == 0) ? current.month : (choose.month += changeRange);
	
	var lastOrNextYear = (choose.month > 12) - (choose.month < 1);	//Jump to Last Year(= -1) or Next Year(= 1) or not(= 0)
	choose.year += lastOrNextYear;
	choose.month -= 12 * lastOrNextYear;	//Last Year(0 + 12), Next Year(13 - 12)
	
	var currentYearAndMonth = (choose.year == current.year && choose.month == current.month)
	choose.date = currentYearAndMonth ? current.date : 1;
	
	drawCalendar(choose);
}
/* 左邊補0 */
function padLeft(str, len) {
    str = '' + str;
    if (str.length >= len) {
        return str;
    } else {
        return padLeft("0" + str, len);
    }
}
function member_array(str, arr) {
	var $result = 0;
	$.map( arr, function( val, key ) {		
    if( key == str  ) $result = 1;
  });
    if($result) return true;
    return false;
}
function drawCalendar(dateJSON)
{
	$('#year').html(dateJSON.year + "年 " + dateJSON.month + "月");
	var dateEnd = new Date(dateJSON.year, dateJSON.month, 0).getDate();	//Get the end of the choosed month(28, 29, 30 or 31)
	var dayStart = new Date(dateJSON.year, (dateJSON.month - 1), 1).getDay(); //Get choosed month's first day
	
	var dateList = "<tr>";
	if(dayStart > 0)
		dateList += "<td id=\"ignoreData\" colspan=" + dayStart + "></td>";
		
	//drawclass = $.makeArray( drawclass );

	var dateCount = 1;
	var SaturdayDate = 7 - dayStart;
	while(dateCount <= dateEnd)
	{
		//dateCount++;
		$ymd = dateJSON.year+"_"+padLeft(dateJSON.month, 2)+"_" + padLeft(dateCount, 2);
		if(member_array($ymd, drawclass)) $myclass = " class=\""+drawclass[$ymd]+"\"";
		else $myclass = "";
		
		dateList += "<td id=\"calendar_td_"+ $ymd + "\""+$myclass+">"+dateCount+"</td>";
		dateCount++;
		if(dateCount > SaturdayDate)	//new week
		{					        //Final week
			SaturdayDate = ((dateCount + 6) > dateEnd) ? dateEnd : (dateCount + 6);
			dateList += "</tr><tr>";
		}
	}
	
	dateList += "</tr>";
	$('#calendar tbody').html(dateList)
						.find('td')
						.filter(function() {return (parseFloat($(this).text()) == dateJSON.date);})
						.addClass('selected');												
	showList();
}

function showList() {	
	{$('#calendar caption').html($('#year').text() + choose.date + "日 " );}
}

function prependZero(vari) {return (vari < 10) ? ("0" + vari) : vari;}
