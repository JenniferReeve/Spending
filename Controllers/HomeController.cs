using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Spending.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            // Redirect to the html file 
            //string url = Url.Content("/Content/tracker.html");
            //return Redirect(url); 
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }
    }
}
