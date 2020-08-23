using System.Collections.Generic;

namespace SSIS.ViewModel
{
    public class OrderTrend
    {
        public string Category { get; set; }
        public List<int> MonthlyTotalQty { get; set; }
    }
}