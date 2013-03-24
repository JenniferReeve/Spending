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
            string url = Url.Content("/Content/tracker.html");
            return Redirect(url); 
        }
    }
}
