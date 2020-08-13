<<<<<<< HEAD
﻿using SSIS.Models;
using SSIS.Payloads;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
=======
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;
>>>>>>> master

namespace SSIS.Services
{
    public interface IRequisitionService
    {
<<<<<<< HEAD
        //Task<ApiResponse> UpdateDeptRep(DeptStaff deptStaff);
        Task<ApiResponse> CreateRequisitionRep(Requisition requisition);
      //  Task<ApiResponse> UpdateRequisition(Requisition requisition);
        //Task<ApiResponse> DeleteRequisitionRep(Requisition requisition);
        //Task<ApiResponse> GetRequisitionRep(Requisition requisition);


    }
}
=======
        Task<ApiResponse> CreateRequisition(List<RequisitionItem> requisitionItems);
    }
}
>>>>>>> master
