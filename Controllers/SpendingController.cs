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
    [InitializeSimpleMembership]
    [Authorize]
    public class SpendingController : ApiController
    {
        // Get a list of the settings 
        // Paged list of settings 
        public IEnumerable<TransactionModels> Get()
        {
            return new TransactionModels[] { 
                new TransactionModels()
                {
                    id = 1,
                    dateSpent = DateTime.Today,
                    description = "Test",
                    amount = 40
                }, 
                new TransactionModels() { 
                    id = 2,
                    dateSpent = DateTime.Today.AddDays(-5),
                    description = "Test 2",
                    amount = 10
                }
            };
        }


        // GET api/values/5
        // Get settings by id 
        public TransactionModels Get(int id)
        {
            return new TransactionModels()
            {
                id = 2,
                dateSpent = new DateTime().AddDays(-5),
                description = "Test 2",
                amount = 10
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
