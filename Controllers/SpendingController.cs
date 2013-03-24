using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Spending.Models;

namespace Spending.Controllers
{
    public class SpendingController : ApiController
    {
        // Get a list of the settings 
        // Paged list of settings 
        public IEnumerable<Transactions> Get()
        {
            return new Transactions[] { 
                new Transactions()
                {
                    id = 1,
                    dateSpent = DateTime.Today,
                    description = "Test",
                    amount = 40
                }, 
                new Transactions() { 
                    id = 2,
                    dateSpent = DateTime.Today.AddDays(-5),
                    description = "Test 2",
                    amount = 10
                }
            };
        }


        // GET api/values/5
        // Get settings by id 
        public Transactions Get(int id)
        {
            return new Transactions()
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
