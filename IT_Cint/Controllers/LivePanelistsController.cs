using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IT_Cint.Models;


namespace IT_Cint.Controllers
{
    public class LivePanelistsController : Controller
    {
        //
        // GET: /LivePanelists/
        LivePanelistsRepository panelistsRepo = new LivePanelistsRepository();


        public JsonResult getLiveRespondents()
        {
            return Json(panelistsRepo.showLivePanelists(), JsonRequestBehavior.AllowGet);

        }

        public ActionResult Index()
        {

            return View("Index");

        }


    }
}