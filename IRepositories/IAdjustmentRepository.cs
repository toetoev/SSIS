using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.IRepositories
{
    public interface IAdjustmentRepository
    {
        Task<List<Adjustment>> GetAll();
        Task<int> CreateAdjustment(Adjustment adjustment);
        Task<Adjustment> GetAdjustmentById(Guid adjustmentId);
        Task<int> UpdateAdjustmentStatus();
        Task<int> UpdateAdjustment();
        Task<int> DeleteAdjustment(Adjustment adjustment);
        Task<List<Adjustment>> GetAdjustmentByTotalPrice(bool isLowerThan);
    }

}