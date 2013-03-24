using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Spending.Models;

namespace Spending.Controllers
{
    public class SettingsController : ApiController
    {
        // GET api/values
        // Get the current settings 
        public Settings Get()
        {
            return new Settings { id = 1, startDate = DateTime.Today, 
                endDate = DateTime.Today.AddMonths(1), income = 5000, savingGoal = 1200, canSpend = 3800 };
        }

        // Get a list of the settings 
        // Paged list of settings 
        public IEnumerable<Settings> Get(int page, int size)
        {
            return new Settings[] { 
                new Settings()
                {
                    id = 2,
                    startDate = DateTime.Today,
                    endDate = DateTime.Today.AddMonths(1),
                    income = 5000,
                    savingGoal = 1200,
                    canSpend = 3800
                }
            };
        }


        // GET api/values/5
        // Get settings by id 
        public Settings Get(int id)
        {
            return new Settings()
            {
                id = 2,
                startDate = DateTime.Today,
                endDate = DateTime.Today.AddMonths(1),
                income = 5000,
                savingGoal = 1200,
                canSpend = 3800
            };
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
