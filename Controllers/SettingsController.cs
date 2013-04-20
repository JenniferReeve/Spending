using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Spending.Models;
using Spending.Filters;

namespace Spending.Controllers
{
    [Authorize]
    [InitializeSimpleMembership]
    public class SettingsController : ApiController
    {
        // GET api/values
        // Get the current settings 
        [Authorize]
        public SettingModels Get()
        {
            return new SettingModels { id = 1, startDate = DateTime.Today, 
                endDate = DateTime.Today.AddMonths(1), income = 5000, savingGoal = 1200, canSpend = 3800 };
        }

        // Get a list of the settings 
        // Paged list of settings 
        [Authorize]
        public IEnumerable<SettingModels> Get(int page, int size)
        {
            return new SettingModels[] { 
                new SettingModels()
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
        [Authorize]
        public SettingModels Get(int id)
        {
            return new SettingModels()
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
        [Authorize]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [Authorize]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [Authorize]
        public void Delete(int id)
        {
        }
    }
}
