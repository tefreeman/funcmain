/*
 * Copyright 1995-2012 Ellucian Company L.P. and its affiliates. 
 */
// $Id$
var bEnableRotatingVerticalNav = false;
var sPleaseWaitMsg = "Please wait<br /> while your request is processed...";

var bBodyFramesetLoaded = false;

function suppressErrors()
{
	return true;
}
onerror = suppressErrors;

//////////////////////////////////////////////////////////////////
function WriteWaitingMsgThisFrame(thisFrame)
{
with (thisFrame.document)
  {
  open();
  write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html lang="en"><head><link rel="stylesheet" href="DashboardStyles.css" type="text/css" /><link rel="stylesheet" href="DashboardLocalizedStyles.css" type="text/css"></head>');
  write('<body class="WaitingMessage" topmargin="0" leftmargin="0" marginwidth="0" marginheight="0">'); 
  write('<table width="100%" height="100%"><tr><td align="center" valign="middle">');
  write('<span class="BodyText">' + sPleaseWaitMsg + '</span>');
  write('</body></html>');
  close();
  } // with
}

//////////////////////////////////////////////////////////////////
function CallScript (sScript, sMessage, sTarget, sForm)
{		 
	var oForm;
	var sControlHTML;
	if (typeof(sMessage) == "undefined" || sMessage == "")
	{
		sMessage = "The service is loading...";
	}

	if (typeof(sTarget) == "undefined" || sTarget == "")
	{
		sTarget = "frSelection";
	}
	else
	{
		//alert(sScript + ", " + sMessage + ", " + sTarget + ", " + sForm);
	}
	if (typeof(sForm) == "undefined" || sForm == "")
	{
		sForm = "frmCallScript";
	}

	if (typeof(document[sForm]) == "undefined")
	{
		//;
	}
	else
	{
		oForm = document[sForm];
		console.log('callscript: ', oform, sform);
		if (typeof(oForm.REPORT) != "undefined")
		{
			oForm.REPORT.value = "";
		}
		// 1.1g Begin
		if (typeof(oForm.ContentType) != "undefined" &&
			sScript.indexOf("ContentType=xml") > -1)
		{
			oForm.ContentType.value = "xml";
		}
		else
		{
			oForm.ContentType.value = "";
		}
		// 1.1g End
		oForm.SCRIPT.value = sScript;
		oForm.target = sTarget;
		oForm.submit();
	}
}

////////////////////////////////////////////////////////////////////////////
// Pad on the left with zeroes up to the length specified
////////////////////////////////////////////////////////////////////////////
function PadZeroes(myNumber, iLength)
{
sNumber = "0" + myNumber; // convert to string
for (i = sNumber.length; i < iLength; i++)
  {
  sNumber = "0" + sNumber;
  }
return sNumber;
} // padzeroes

function Trim(myString, trimCharacter)
{
	if (typeof(trimCharacter) == "undefined")
	{
		trimCharacter = " ";
	}
    // Handle the error if trimCharacter is too long
    if (trimCharacter.length > 1)
	{
        alert("Trim error: '" +
        trimCharacter +
        "' is more than one character long.");
        return myString;
    }
    // Make a copy of the string to work with
    newString = myString;

    // Remove the leading characters
    while (newString.charAt(0) == trimCharacter)
	{
        newString = newString.substring(1,newString.length);
    }
    // Remove the trailing characters
    while (newString.charAt(newString.length - 1) == trimCharacter)
	{
        newString = newString.substring(0,newString.length - 1);
    }
    return newString;
}
////////////////////////////////////////////////////////////////////////////
// TRIM SPACES
// Remove spaces from the front and end of the string.
// Return the new string without the spaces at the start or end.
////////////////////////////////////////////////////////////////////////////
function TrimSpaces (sMyString)
{
	return (Trim (sMyString, " "));
} // trimspaces


////////////////////////////////////////////////////////////////////////////
function PrintFrame(sTarget)
{
	if (top[sTarget]["fraExpBody"])
	{
		top[sTarget]["fraExpBody"].focus();
		top[sTarget]["fraExpBody"].print();
		self.focus();
	}
	else if (top[sTarget])
	{
		top[sTarget].focus();
		top[sTarget].print();
		self.focus();
	}
	else
	{
		alert("PrintFrame Error: The frame \"" + sTarget + "\" is not found.");
	}
}

////////////////////////////////////////////////////////
function IsBlank(sString)
{
	for (var iNdx = 0; iNdx < sString.length; iNdx++)
	{
   		if (sString.charAt(iNdx) != ' ')
		{
			return (false); // String is NOT blank
		}
	} // end for
	return (true);  // String is blank
} // end isblank

////////////////////////////////////////////////////////////////////////////

function fnGetDate(intDaysAgo)
{
//##################################################
//## Function:	fnGetDate
//## Action:	Returns the date X number of days ago in the format YYYYMMDD
//##################################################
	//## Code: Declare a blank string to hold the formatted date string we will be returning.
	var strTmpDate = "";
	//## Code: Decalre a new Date object and seed it with the current date.
	var objTmpDate = new Date();
	//## Code: Perform Date arithimatic and subtract the days from the current date.
	objTmpDate.setDate(objTmpDate.getDate() - intDaysAgo);
	//## Code: Save the Year YYYY to the date string.
	strTmpDate = "" + objTmpDate.getFullYear();
	//## Code: In JavaScript Months are 0-11 so we need to add 1 to the Month.
	//## Code: If the Month is a single digit pad with a leading 0 and/or store in date string.
	if (objTmpDate.getMonth() < 10)
	{
		if (objTmpDate.getMonth() < 9)
		{ 
			strTmpDate = strTmpDate + "0" + (objTmpDate.getMonth() + 1);
		} // 1.1d // 1.1e
		else 
		{
			strTmpDate = strTmpDate + (objTmpDate.getMonth() + 1);
		} // 1.1d // 1.1e
	}
	else { strTmpDate = strTmpDate + (objTmpDate.getMonth() + 1); } // 1.1d
	//## Code: If the Day is a single digit pad with a leading 0 and/or store in the date string.
	if (objTmpDate.getDate() < 10) { strTmpDate = strTmpDate + "0" + objTmpDate.getDate(); } // 1.1d
	else { strTmpDate = strTmpDate + objTmpDate.getDate(); } // 1.1d
	//## Code: Return the formatted date string to the calling function YYYYMMDD.
	return strTmpDate;
//##################################################
//## END: fnGetDate
//##################################################
}

function menuActivate(oThisTab)
{
	var oThisTab = this;
	var anchors = document.getElementById("verticalnav").getElementsByTagName("a");
	for (var i=0; i<anchors.length; i++)
	{
		var anchor = anchors[i];
		//if (anchor.parentNode.className != "selected")
		{
			anchor.parentNode.className = "notselected";
		}
	}
	oThisTab.parentNode.className = "selected";
	oThisTab.className = "selected";

	if (bEnableRotatingVerticalNav)
	{
		var list = document.getElementById("verticalnav");
		var listitems = document.getElementById("verticalnav").getElementsByTagName("li");
		for (var i=0; i < listitems.length; i++)
		{
			var item = listitems[i];
			if (item.className == "selected")
			{
				list.removeChild(item);
				list.insertBefore(item, list.firstChild);
				break;
			}
		}
	}
}

function SetupVerticalNav() {
	var anchors = document.getElementById("verticalnav").getElementsByTagName("a");
	for (var i=0; i<anchors.length; i++) 
	{
    	var anchor = anchors[i];
    	if (this.attachEvent)
    	{
    		//Only for IE
    		anchor.onclick = menuActivate;
    	}
    	else
    	{
    		//Only for Firefox, Safari
    		addListener(anchor, "click", menuActivate);
    	}
	}
	anchorFirst = document.getElementById("verticalnav").getElementsByTagName("a");
	if (anchorFirst[0].click)
	{
		//Only for IE
		anchorFirst[0].click();
	}
	else
	{
		//Only for Firefox, Safari
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		anchorFirst[0].dispatchEvent(evt);
	}
}

function replaceBr(sText, replaceWith)
{
	s = new String(sText);
	//var s = sText;
	//String s = sText.toString();
	regex = /\<br\>/gi;
	
	s = s.replace(regex, replaceWith);

	return s;
}

function replaceCarriageReturn(sInput, replaceWith)
{
	var sText = escape(sInput); //encode all characters in text area to find carriage return character

	for(i=0; i < sText.length; i++) 
	{
		//loop through string, replacing carriage return encoding with HTML break tag
		if(sText.indexOf("%0D%0A") > -1) 
		{
			//Windows encodes returns as \r\n hex
			sText=sText.replace("%0D%0A",replaceWith)
		}
		else if(sText.indexOf("%0A") > -1) 
		{
			//Unix encodes returns as \n hex
			sText=sText.replace("%0A",replaceWith)
		}
		else if(sText.indexOf("%0D") > -1) 
		{
			//Macintosh encodes returns as \r hex
			sText=sText.replace("%0D",replaceWith)
		}
	}
	sText=unescape(sText) //decode all characters in text area back
   return sText;
}

function consistentCarriage(sInput)
{
	var sText = escape(sInput); //encode all characters in text area to find carriage return character
	var replaceWith = "\r\n ";
	for(i=0; i < sText.length; i++) 
	{
		//loop through string, replacing carriage return encoding with \r\n
		if(sText.indexOf("%0A") > -1) 
		{
			//Unix encodes returns as \n hex
			sText=sText.replace("%0A",replaceWith)
		}
		else if(sText.indexOf("%0D") > -1) 
		{
			//Macintosh encodes returns as \r hex
			sText=sText.replace("%0D",replaceWith)
		}
	}
	sText=unescape(sText) //decode all characters in text area back
   return sText;
}

function WindowLoad()
{
	var inputs = document.getElementsByTagName('input');
	for (var i=0; i < inputs.length; i++)
	{
		if (inputs[i].type == 'button' || inputs[i].type == 'submit' || inputs[i].type == 'reset')
		{
			//alert(input.className);
			var input = inputs[i];
			input.className = "GeneralButton";
		}
	}
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}
function addListener(element, event, listener, bubble) {
	if(element.addEventListener)
	{
	  //Only for Firefox, Safari
	  if(typeof(bubble) == "undefined") bubble = false;
	  element.addEventListener(event, listener, bubble);
	}
	else if(this.attachEvent)
	{
	  //Only for IE
	  element.attachEvent("on" + event, listener);
	}
}

//addLoadEvent(WindowLoad);
//document.addEventListener('load',WindowLoad,false);
addListener(this, "load", WindowLoad);

function replaceBr(sText, replaceWith)
{
   s = new String(sText);
	//var s = sText;
	//String s = sText.toString();
	regex = /\<br\>/gi;
	
	s = s.replace(regex, replaceWith);

	return s;
}

function replaceCarriageReturn(sInput, replaceWith)
{
	var sText = escape(sInput); //encode all characters in text area to find carriage return character

	for(i=0; i < sText.length; i++) 
	{
		//loop through string, replacing carriage return encoding with HTML break tag
		if(sText.indexOf("%0D%0A") > -1) 
		{
			//Windows encodes returns as \r\n hex
			sText=sText.replace("%0D%0A",replaceWith)
		}
		else if(sText.indexOf("%0A") > -1) 
		{
			//Unix encodes returns as \n hex
			sText=sText.replace("%0A",replaceWith)
		}
		else if(sText.indexOf("%0D") > -1) 
		{
			//Macintosh encodes returns as \r hex
			sText=sText.replace("%0D",replaceWith)
		}
	}
	sText=unescape(sText) //decode all characters in text area back
   return sText;
}

function convert_date(string) {
  // converts a string in the format ccyymmdd to a date
    return new Date(
      string.substring(0,4),
      string.substring(4,6)-1,
      string.substring(6,8)
    );
}

function format_date(s)
{
	d = new Date(convert_date(s));
	//str = new String(s);
	return d.toLocaleDateString();
}

//////////////////////////////////////////////////////////
// FORMATDATE
//  Input = date as CCYYMMDD
// Returns: formated date based on globally defined sDateFormat setting.
// Four date formats are supported:
//   DMY=12/31/2009 
//   YMD=2009/12/31 
//   DMY=31/12/2009
//   DXY=31-Dec-2009
//////////////////////////////////////////////////////////
function FormatDate (sDateCCYYMMDD)
{
  //alert ("Control.js - FormatDate: Date format = " + sDateFormat);
  //if (typeof(sDateFormat) == "undefined" || sDateFormat == null)
  if (typeof(sDateFormat) == "undefined")
    {
    alert ("Control.js - FormatDate sDateFormat is undefined.");
    sDateFormat = "MDY";
    }
  if (sDateFormat == null) // sDateFormat should be defined in SD2STUCON
    {
    alert ("Control.js - FormatDate sDateFormat is null.");
    sDateFormat = "MDY";
    }

  sYear  = sDateCCYYMMDD.substring(0,4);
  sMonth = sDateCCYYMMDD.substring(4,6);
  sDay   = sDateCCYYMMDD.substring(6,8);
  if (sDateFormat      == "DMY") // Europe etc - 31/12/2009
   sFormattedDate = sDay   +  "/" + sMonth +  "/" + sYear; // dd / mm / ccyy

  else if (sDateFormat == "DXY") // Europe etc - 31-Dec-2009
   {
   if      (sMonth == "01") sMonthWord = "Jan"
   else if (sMonth == "02") sMonthWord = "Feb"
   else if (sMonth == "03") sMonthWord = "Mar"
   else if (sMonth == "04") sMonthWord = "Apr"
   else if (sMonth == "05") sMonthWord = "May"
   else if (sMonth == "06") sMonthWord = "Jun"
   else if (sMonth == "07") sMonthWord = "Jul"
   else if (sMonth == "08") sMonthWord = "Aug"
   else if (sMonth == "09") sMonthWord = "Sep"
   else if (sMonth == "10") sMonthWord = "Oct"
   else if (sMonth == "11") sMonthWord = "Nov"
   else if (sMonth == "12") sMonthWord = "Dec"
   else                     sMonthWord = "???"

   sFormattedDate = sDay + '-' + sMonthWord + '-' + sYear; // dd-Mon-ccyy
   }

  else if (sDateFormat == "YMD") // China etc  - 2009/12/31
   sFormattedDate = sYear  +  "/" + sMonth +  "/" + sDay;  // ccyy / mm / dd

  else // MDY - USA - 12/31/2009
   sFormattedDate = sMonth +  "/" + sDay   +  "/" + sYear; // mm / dd / ccyy
  
  return sFormattedDate;
}

//Set variables for DoLogout
var bSwitchingContext = false;
var bLogoutRequestSent = false;

//Logout using an synchronous AJAX call to redirect to /logout which would trigger the logoutFilter.
function DoLogout()
{
   if (bSwitchingContext)
   {
      return;
   }
   
   if (top.bEnableExternalLogout)
   {
      $.ajax(
      {
         async: false,
         url: top.sLogoutUrl
      });
      top.location.href = top.sExternalLogoutUrl;
   }
   else
   {
      top.location.href = top.sLogoutUrl;
   }
}

function rite(sValue)
{
  document.writeln(sValue);
}

function DrawLink(sValue, sHref, sTarget)
{
  rite('<td class="LinkTableTitle">');
  rite('  <a href="javascript:' + sHref + '" ');
  //rite('     title="' + sValue + '" ');
  if (typeof(sTarget) != "undefined")
    rite (' target="' + sTarget + '" ');
  rite('>' + sValue + '</a> ');
  rite('</td>');
}

function DrawHref(sValue, sHref, sTarget)
{
  rite('<td class="LinkTableTitle">');
  rite('  <a href="' + sHref + '" ');
  //rite('     title="' + sValue + '" ');
  if (typeof(sTarget) != "undefined")
    rite (' target="' + sTarget + '" ');
  rite('>' + sValue + '</a> ');
  rite('</td>');
}

//postToUrl("<$ILENV-DW_URL_STUDENT_PLANNER>/redirect.jsp", { passport: "<$ILCGI-PASSPORT>", destination: "<$ILENV-DW_URL_STUDENT_PLANNER>/secured/secured.zul" } );
function postToUrl(path, params, sTarget)
{
   var method = "POST";
   sTarget = sTarget || "_blank";

   var form = document.createElement("form");

   // move the submit function to another variable
   // so that it doesn't get over written
   form._submit_function_ = form.submit;

   form.setAttribute("method", method);
   form.setAttribute("action", path);
   form.setAttribute("target", sTarget);
   console.log('postToUrl:', path, params, sTarget);
   for ( var key in params)
   {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);

      form.appendChild(hiddenField);
   }

   document.body.appendChild(form);
   form._submit_function_(); // call the renamed function
}

function endsWith(str, suffix)
{
   return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function onBodyFramesetLoaded()
{
//alert("top onBodyFramesetLoaded enter");
   frLeft = frBodyContainer.frLeft;
   frSelection = frBodyContainer.frSelection;
   frBody = frBodyContainer.frBody;
   frWhiteFooter = frBodyContainer.frWhiteFooter;
   frBodyContainer.frTabs = top.frTabs;
   bBodyFramesetLoaded = true;
//alert("top onBodyFramesetLoaded exit");
}

function reloadBodyFrameset()
{
   // When the frameset is loaded the onBodyFramesetLoaded function will get called
   // and this variable will get set to true. Callers of this function can then
   // check this flag to know that the frameset got loaded successfully
   // See SD2STUCON and SD2GENTAB; they check for this bBodyFramessetLoaded flag
   bBodyFramesetLoaded = false;
   top.frBodyContainer.location.href = "SD_BodyFrameset.html";
   return true;
}

function isZkLoaded()
{
   if (top.frControl.sTabContext.indexOf("ZK") == 0) // ZKPLANNER, ZKFINDER, etc
   {
      return true;
   }
   else
   {
      return false;
   }
}
