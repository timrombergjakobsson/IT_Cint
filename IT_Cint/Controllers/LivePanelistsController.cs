using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IT_Cint.Models;
using System.Net;


namespace IT_Cint.Controllers
{
    public class LivePanelistsController : Controller
    {
        //
        // GET: /LivePanelists/
        LivePanelistsRepository panelistsRepo = new LivePanelistsRepository();

        
        public JsonResult getLiveRespondents()
        {
            using (WebResponse response = request.GetResponse())
{
	            if ((HttpWebResponse)response).StatusCode == HttpStatusCode.NotModified)


                return Json(panelistsRepo.showLivePanelists(), JsonRequestBehavior.AllowGet);
                } 
            }
                catch (WebException ex) 
            {
                HttpWebResponse httpResponse = wex.Response as HttpWebResponse;
                if (httpResponse.StatusCode == HttpStatusCode.NotModified)
                {
                    Console.WriteLine("Entity has not been updated since your last request");
                }
            }

        public ActionResult Index()
        {
            return View("Index");

        }


    }
}