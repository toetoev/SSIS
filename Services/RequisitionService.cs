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
                DepartmentName = requestedBy.DepartmentName,
            };

            foreach (var requisitionItem in requisitionItems)
            {
                if (!await _itemRepository.ItemExist(requisitionItem.ItemId))
                    return new ApiResponse { Success = false, Message = "Some items do not exist" };
                if (requisitionItem.Need < 1)
                    return new ApiResponse { Success = false, Message = "Item requested should at least have one" };
                requisitionItem.RequisitionId = requisition.Id;
            }
            requisition.RequisitionItems = requisitionItems;
            await _requisitionRepository.CreateRequisition(requisition);
            return new ApiResponse { Success = true };
        }

        public async Task<ApiResponse> GetRequisitionsByDeptStaff(string email)
        {
            DeptStaff deptStaff = await _deptStaffRepository.GetDeptStaffByEmail(email);
            List<RequisitionStatus> requisitionStatuses = new List<RequisitionStatus> { };
            switch (deptStaff.Role)
            {
                case DeptRole.Employee:
                    requisitionStatuses = Enum.GetValues(typeof(RequisitionStatus)).Cast<RequisitionStatus>().ToList();
                    break;
                case DeptRole.DeptRep:
                    requisitionStatuses = new List<RequisitionStatus> { RequisitionStatus.APPROVED, RequisitionStatus.DELIVERED, RequisitionStatus.PENDING_COLLECTION, RequisitionStatus.PROCESSING_RETRIEVAL };
                    break;
                case DeptRole.DeptHead:
                    requisitionStatuses = new List<RequisitionStatus> { RequisitionStatus.APPLIED, RequisitionStatus.APPROVED, RequisitionStatus.DELIVERED, RequisitionStatus.PENDING_COLLECTION };
                    break;
                default:
                    break;
            }
            return new ApiResponse { Success = true, Data = await _requisitionRepository.GetRequisitionsByDeptStaff(deptStaff.Department.Name, requisitionStatuses) };
        }

        public async Task<ApiResponse> GetRequisitionsByStatus(RequisitionStatus status)
        {
            return new ApiResponse { Success = true, Data = await _requisitionRepository.GetRequisitionsByStatus(status) };
        }

        public async Task<ApiResponse> ReviewRequisition(Guid requisitionId, RequisitionStatus status, string email)
        {
            Requisition requisition = await _requisitionRepository.GetRequisitionById(requisitionId);
            DeptStaff deptStaff = await _deptStaffRepository.GetDeptStaffByEmail(email);
            if (requisition != null)
            {
                if (requisition.DepartmentName == deptStaff.Department.Name)
                {
                    requisition.Status = status;
                    return new ApiResponse { Success = true, Data = await _requisitionRepository.UpdateRequisition() };
                }
                else return new ApiResponse { Success = false, Message = "Sorry, you can only review requisition of your own department" };

            }
            return new ApiResponse { Success = false, Message = "Cannot find requisition reviewing" };
        }
    }
}