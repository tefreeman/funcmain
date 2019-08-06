var sCgiPath = "dashboard";

var sCopyright = "1995 - 2018"
var bWebAccess = true;
var bExpMgtAccess = false;
var bChangePasswordAccess = false;
var bInstantRapport = false;
var bCasLogoutEnabled = false;
var bSepTemplateAccess = false;
var bEnableExternalLogout = false;




bEnableExternalLogout = true;
var sExternalLogoutUrl = "https://login.ua.edu/cas/logout?service=https://degreeworks.ua.edu";



var defaultPlannerUrl = "/planner";
var defaultFinderUrl = "/finder";
var sSepBaseUrl = "/dw/planner";
var sTransferFinderBaseUrl = "";
var sLogoutUrl = "logout";

if (sSepBaseUrl.length == 0)
{
	sSepBaseUrl = defaultPlannerUrl;
}

if (sTransferFinderBaseUrl.length == 0)
{
	sTransferFinderBaseUrl = defaultFinderUrl;
}

//If there is a slash on sSepBaseUrl, remove it
if (sSepBaseUrl.length > 0)
{
   if (endsWith(sSepBaseUrl, "/"))
   {
      sSepBaseUrl = sSepBaseUrl.substr(0, sSepBaseUrl.length - 1);
   }
}

var sSepRedirectUrl = sSepBaseUrl;
var sSepTemplateUrl = "/template/template-management.zul";

function redirectToAppServer(sRedirectBaseUrl, sDestinationUrl, sTarget)
{
   postToUrl(sRedirectBaseUrl + sDestinationUrl, {passport: "Y5NSAJNGLBBEU45ILOUEXA227O"}, sTarget);
}

//////////////////////////////////////////////////////////////////////////////
// You can pass in an sMode to be used here to control where the link
// should go within Self-Service.
//////////////////////////////////////////////////////////////////////////////
function BackToSelfServiceBanner(sMode)
{
// assume user is not a student (or not logged on as one anyway)
var bStudent = false;
bStudent = true; // this is a student

if (bStudent)
  {
  if (sMode=="Transcript")
    sMenuName="bwskotrn.P_ViewTermTran";
  else // normal mode
    sMenuName="twbkwbis.P_GenMenu?name=bmenu.P_AdminMnu";
  }
else // not a student
  {
  if (sMode=="Transcript")
    sMenuName="bwlkftrn.P_FacDispTran";
  else // normal mode
    sMenuName="twbkwbis.P_GenMenu?name=bmenu.P_FacStuMnu";
  }
window.location.href = "http://yourserver/somepath/" + sMenuName;
} // backtoselfservicebanner
//////////////////////////////////////////////////////////////////////////////
function LoadScripts()
{
if (! bWebAccess)   // User is not allowed any web access
  {
  alert ("You have not been given permission to use this application.");
  window.close();
  }

    frBodyContainer.document.frmLoadFrame.action = "dashboard";
    frBodyContainer.document.frmLoadFrame.method = sDefaultMethod;
    frBodyContainer.document.frmLoadFrame.target = "frBodyContainer";
    frBodyContainer.document.frmLoadFrame.SCRIPT.value = "SD2WORKSBODYFRAMES";
    frBodyContainer.document.frmLoadFrame.submit();

    frControl.document.frmLoadFrame.action = "dashboard";
    frControl.document.frmLoadFrame.method = sDefaultMethod;
    frControl.document.frmLoadFrame.target = "frControl";
    frControl.document.frmLoadFrame.SCRIPT.value = "SD2STUCON";
    frControl.document.frmLoadFrame.submit();

    frTabs.document.frmLoadFrame.action = "dashboard";
    frTabs.document.frmLoadFrame.method = sDefaultMethod;
    frTabs.document.frmLoadFrame.target = "frTabs";
    frTabs.document.frmLoadFrame.SCRIPT.value = "SD2GENTAB";
    frTabs.document.frmLoadFrame.submit();

}
