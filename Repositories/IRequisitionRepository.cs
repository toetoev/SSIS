<<<<<<< HEAD
﻿using SSIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
=======
using System.Threading.Tasks;
using SSIS.Models;
>>>>>>> master

namespace SSIS.Repositories
{
    public interface IRequisitionRepository
    {
<<<<<<< HEAD
        Task<Requisition> GetRequisitionFromRepo(Requisition requisition);
        //Task<Requisition> GetRequisition(Requisition requisitionFromRepo);
        //void CreateRequisition(Requisition requisitionFromRepo);
        //Task<Requisition> CreateRequisition(Requisition requisitionFromRepo);

        //void UpdateRequisition(Requisition requisitionFromRepo);

        //void DeleteRequisition(Requisition requisitionFromRepo);

    }
}
=======
        Task<Requisition> CreateRequisition(Requisition requisition);
    }
}
>>>>>>> master
