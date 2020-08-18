using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;

namespace SSIS.Services
{
    public class RetrievalItemService : IRetrievalItemService
    {
        private readonly IRetrievalItemRepository _retrievalItemRepository;
        private readonly IStoreStaffRepository _storeStaffRepository;

        public RetrievalItemService(IRetrievalItemRepository retrievalItemRepository, IStoreStaffRepository storeStaffRepository)
        {
            _retrievalItemRepository = retrievalItemRepository;
            _storeStaffRepository = storeStaffRepository;

        }

        public async Task<ApiResponse> GetAllRetrievalItems(string email)
        {
            StoreStaff storeStaffFromRepo = await _storeStaffRepository.GetStoreStaffByEmail(email);
            if (storeStaffFromRepo != null)
                return new ApiResponse { Success = true, Data = await _retrievalItemRepository.GetAllRetrievalItems(email) };
            else
                return null;
        }
    }
}