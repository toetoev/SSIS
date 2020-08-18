using System.Linq;
using System.Threading.Tasks;
using SSIS.Databases;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;

namespace SSIS.Services
{
    public class DelegationService : IDelegationService
    {
        private readonly IDelegationRepository _delegationRepository;
        public DelegationService(IDelegationRepository delegationRepository)
        {
            _delegationRepository = delegationRepository;
        }

        public async Task<ApiResponse> GetDelegationByDeptHeadEmail(string delegatedByEmail)
        {

            return new ApiResponse { Success = true, Data = await _delegationRepository.GetDelegationsByDeptHeadEmail(delegatedByEmail) };
        }
    }
}