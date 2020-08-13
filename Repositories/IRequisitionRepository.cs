using SSIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Repositories
{
    public interface IRequisitionRepository
    {
        Task<Requisition> GetRequisitionFromRepo(Requisition requisition);
        //Task<Requisition> GetRequisition(Requisition requisitionFromRepo);
        //void CreateRequisition(Requisition requisitionFromRepo);
        //Task<Requisition> CreateRequisition(Requisition requisitionFromRepo);

        //void UpdateRequisition(Requisition requisitionFromRepo);

        //void DeleteRequisition(Requisition requisitionFromRepo);

    }
}
