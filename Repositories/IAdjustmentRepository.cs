using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
    public interface IAdjustmentRepository
    {
        Task<List<Adjustment>> GetAll();
        Task<int> CreateAdjustment(Adjustment adjustment);
        Task<Adjustment> GetAdjustmentById(Guid adjustmentId);
        Task<int> UpdateAdjustment();
    }
}