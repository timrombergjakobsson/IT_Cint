using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IT_Cint.Models;
using System.Net;
using RespondentMap.Controllers;


namespace IT_Cint.Controllers
{
    public class LivePanelistsController : Controller
    {
        //
        // GET: /LivePanelists/
        private LivePanelistsRepository panelistsRepo;

        private HttpWebRequest request;
        // Note that previousValue is a DateTime now!
        //request.IfModifiedSince = previousValue;

        public LivePanelistsController()
        {
            panelistsRepo = new LivePanelistsRepository();
            request = (HttpWebRequest)WebRequest.Create("http://localhost:56803/LivePanelists");
        }

        public JsonResult getLiveRespondents()
        {
            using (WebResponse response = request.GetResponse())
            {
	            if (((HttpWebResponse)response).StatusCode == HttpStatusCode.NotModified)
                    return Json(panelistsRepo.showLivePanelists(), JsonRequestBehavior.AllowGet);
            }
            try { }
            catch (WebException wex)
            {
                HttpWebResponse httpResponse = wex.Response as HttpWebResponse;
                if (httpResponse.StatusCode == HttpStatusCode.NotModified)
                    Console.WriteLine("Entity has not been updated since your last request");
            }
        }

        public  HttpStatusCode StatusCode { get; set; }
        
       // [OutputCache(Duration=5, Location=OutputCacheLocation.ServerAndClient)]
        public ActionResult Index()
        {
            
            var ifModifiedSince = Request.Headers["If-Modified-Since"];
                if( !String.IsNullOrEmpty( ifModifiedSince ) )
                {
                    Response.StatusCode = 304;
                    Response.StatusDescription = "Not Modified";
                    Response.End();
                    return new EmptyResult();
                } 
                else 
                {
                   return View("Index");

                }

        }


    }
}