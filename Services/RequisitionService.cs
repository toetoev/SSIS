using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Databases;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;

namespace SSIS.Services
{
    public class RequisitionService : IRequisitionService
    {
        private readonly IDeptStaffRepository _deptStaffRepository;
        private readonly IRequisitionRepository _requisitionRepository;
        private readonly IItemRepository _itemRepository;

        public RequisitionService(IDeptStaffRepository deptStaffRepository,
            IRequisitionRepository requisitionRepository,
            IItemRepository itemRepository)
        {
            _deptStaffRepository = deptStaffRepository;
            _requisitionRepository = requisitionRepository;
            _itemRepository = itemRepository;
        }

        public async Task<ApiResponse> CreateRequisition(List<RequisitionItem> requisitionItems, string email)
        {
            DeptStaff requestedBy = await _deptStaffRepository.GetDeptStaffByEmail(email);
            Requisition requisition = new Requisition
            {
                Id = Guid.NewGuid(),
                RequestedOn = DateTime.Now,
                Status = RequisitionStatus.APPLIED,
                RequestedBy = requestedBy,
                Department = requestedBy.Department,
            };

            bool isItemValid = true;
            foreach (var requisitionItem in requisitionItems)
            {
                if (!await _itemRepository.ItemExist(requisitionItem.ItemId))
                {
                    isItemValid = false;
                    break;
                }
                requisitionItem.RequisitionId = requisition.Id;
            }
            if (isItemValid)
            {
                requisition.RequisitionItems = requisitionItems;
                await _requisitionRepository.CreateRequisition(requisition);
                return new ApiResponse { Success = true };
            }
            else
                return new ApiResponse { Success = false, Message = "Some items do not exist" };
            throw new NotImplementedException();
        }

        public async Task<ApiResponse> GetRequisitionsByDeptStaff(string email)
        {
            return new ApiResponse { Success = true, Data = await _requisitionRepository.GetRequisitionsByDeptStaff(email) };
        }
    }
}