using System;
namespace SSIS.Models
{
    public enum RequisitionStatus
    {
        APPLIED,
        APPROVED,
        REJECTED,
        PROCESSING_RETRIEVAL,
        PENDING_COLLECTION,
        DELIVERED
    }
}

/*
﻿using System;
namespace SSIS.Models
{
    public class RequisitionStatus
    {
        //When department employee submit the requsition form
        public const string Applied = "APPLIED";

        //When department head approves the requsition form
        public const string Approved = "APPROVED";

        //When department head rejects the requsition form
        public const string Rejected= "REJECTED";

        //When selected to be put into a retrieval list and being disbursed
        public const string ProcessingRetrieval = "PROCESSING_RETRIEVAL";

        //After a requisition gets all items disbursed to it and ready for collection
        public const string PendingCollection = "PENDING_COLLECTION";

        //After department representative acknowledges the collected stationery items
        public const string Delivered = "DELIVERED";
    }
}



>>>>>>> Stashed changes
*/