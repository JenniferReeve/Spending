using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spending.Models
{
    public class SettingModels
    {
        public long id { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public decimal income { get; set; }
        public decimal savingGoal { get; set; }
        public decimal canSpend { get; set; } 
    }
}