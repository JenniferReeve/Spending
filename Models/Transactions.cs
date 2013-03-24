using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spending.Models
{
    public class Transactions
    {
        public long id { get; set; }
        public string description { get; set; }
        public DateTime dateSpent { get; set; }
        public double amount { get; set; } 
    }
}