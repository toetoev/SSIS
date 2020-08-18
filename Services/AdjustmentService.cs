using System.Threading.Tasks;
using SSIS.Payloads;
using SSIS.Repositories;
using SSIS.Services;

namespace SSIS.Services
{
    public class AdjustmentService : IAdjustmentService
    {
        private readonly IAdjustmentRepository _adjustmentRepository;

        public AdjustmentService(IAdjustmentRepository adjustmentRepository)
        {
            _adjustmentRepository = adjustmentRepository;
        }
        public async Task<ApiResponse> GetAllAdjustments()
        {
            return new ApiResponse { Success = true, Data = await _adjustmentRepository.GetAll() };
        }
    }
}