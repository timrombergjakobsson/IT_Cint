using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RespondentMap.Controllers
{
    public class ErrorController : Controller
    {
        //
        // GET: /Error/

        public ActionResult Error(HttpStatusCodes statusCode, Exception exception) 
        {
            var resource = new ErrorResource(statusCode, exception);
            this.response.StatusCode = resource.StatusCode;

            return View("Error", resource);
        }

    }
}
