using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Databases;
using SSIS.IRepositories;
using SSIS.IService;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Services
{
    public class DelegationService : IDelegationService
    {
        private readonly IDelegationRepository _delegationRepository;
        private readonly IDeptStaffRepository _deptStaffRepository;
        public DelegationService(IDelegationRepository delegationRepository, IDeptStaffRepository deptStaffRepository)
        {
            _delegationRepository = delegationRepository;
            _deptStaffRepository = deptStaffRepository;
        }

        public async Task<ApiResponse> CreateDelegation(Delegation delegation, string delegatedByEmail)
        {
            DeptStaff delegatedBy = await _deptStaffRepository.GetDeptStaffByEmail(delegatedByEmail);
            DeptStaff delegatedTo = await _deptStaffRepository.GetDeptStaffByEmail(delegation.DelegatedToEmail);
            if (delegatedTo != null && delegatedBy.DepartmentName == delegatedTo.DepartmentName)
            {
                if (delegation.EndDate != null && DateTime.Compare(delegation.EndDate, delegation.StartDate) > 0)
                {
                    if (DateTime.Compare(DateTime.Now, delegation.StartDate) < 0)
                    {

                        Delegation delegationFromRepo = await _delegationRepository.GetDelegationByDelegatedByEmailAndStartDate(delegatedByEmail, delegation.StartDate);
                        if (delegationFromRepo == null)
                        {
                            Delegation newDelegation = new Delegation { Id = Guid.NewGuid(), DelegatedBy = delegatedBy, DelegatedTo = delegatedTo, StartDate = delegation.StartDate, EndDate = delegation.EndDate, Comment = delegation.Comment };
                            return new ApiResponse { Success = true, Data = await _delegationRepository.CreateDelegation(newDelegation) };
                        }
                        else
                            return new ApiResponse { Success = false, Message = "A delegate has already been selected during this date range selected" };
                    }
                    else
                        return new ApiResponse { Success = false, Message = "The delegation start date should be after the current date" };
                }
                else
                    return new ApiResponse { Success = false, Message = "The delegation end date should be after the start date" };
            }
            else
                return new ApiResponse { Success = false, Message = "The Department Head and Department Employee being delegated must be in the same department" };
        }

        public async Task<ApiResponse> GetDelegation(string deptStaffEmail)
        {
            DeptStaff deptStaffFromRepo = await _deptStaffRepository.GetDeptStaffByEmail(deptStaffEmail);
            if (deptStaffFromRepo.Role == DeptRole.DeptHead)
                return new ApiResponse { Success = true, Data = await _delegationRepository.GetDelegationsByDepartment(deptStaffFromRepo.DepartmentName) };
            else
                return new ApiResponse { Success = true, Data = await _delegationRepository.IsDelegated(deptStaffEmail) };
        }

        public async Task<ApiResponse> UpdateDelegation(Delegation delegation, Guid delegationId, string delegatedByEmail)
        {
            DeptStaff delegatedBy = await _deptStaffRepository.GetDeptStaffByEmail(delegatedByEmail);
            Delegation delegationFromRepo = await _delegationRepository.GetDelegationsById(delegationId);
            if (delegationFromRepo != null)
            {
                DeptStaff delegatedTo = await _deptStaffRepository.GetDeptStaffByEmail(delegation.DelegatedToEmail);
                if (delegatedTo != null && delegatedBy.DepartmentName == delegatedTo.DepartmentName)
                {
                    if (delegationFromRepo.StartDate.CompareTo(delegation.EndDate) < 0 && DateTime.Now.CompareTo(delegation.EndDate) < 0)
                    {
                        delegationFromRepo.DelegatedTo = delegatedTo;
                        delegationFromRepo.StartDate = delegation.StartDate;
                        delegationFromRepo.EndDate = delegation.EndDate;
                        return new ApiResponse { Success = true, Data = await _delegationRepository.UpdateDelegation() };
                    }
                    else
                        return new ApiResponse { Success = false, Message = "Updated end date should be after now" };
                }
                else
                    return new ApiResponse { Success = false, Message = "You can only delegate authority to your department staff" };
            }
            else
                return new ApiResponse { Success = false, Message = "Cannot find the delegation to be updated" };
        }

        public async Task<ApiResponse> DeleteDelegation(Guid delegationId)
        {
            Delegation delegationFromRepo = await _delegationRepository.GetDelegationsById(delegationId);
            if (delegationFromRepo != null)
                return new ApiResponse { Success = true, Data = await _delegationRepository.DeleteDelegation(delegationFromRepo) };
            else
                return new ApiResponse { Success = false, Message = "Cannot find the delegation to be deleted" };
        }
    }
}