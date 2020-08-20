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
            DateTime startDate = DateTime.Now;

            if (delegatedTo != null && delegatedBy.DepartmentName == delegatedTo.DepartmentName)
            {
                if (delegation.EndDate != null && DateTime.Compare(delegation.EndDate, startDate) > 0)
                {
                    Delegation newDelegation = new Delegation { DelegatedBy = delegatedBy, StartDate = startDate, EndDate = delegation.EndDate, Comment = delegation.Comment };
                    return new ApiResponse { Success = true, Data = await _delegationRepository.CreateDelegation(newDelegation) };
                }
                else
                {
                    return new ApiResponse { Success = false, Message = "Error with EndDate." };
                }
            }
            else
            {
                return new ApiResponse { Success = false, Message = "Department name of the DeptHead and the DeptStaff getting delegated MUST be the same." };
            }
        }

        public async Task<ApiResponse> GetDelegationByDeptHeadEmail(string delegatedByEmail)
        {

            return new ApiResponse { Success = true, Data = await _delegationRepository.GetDelegationsByDeptHeadEmail(delegatedByEmail) };
        }

        public async Task<ApiResponse> UpdateDelegation(Delegation delegation)
        {
            DeptStaff delegatedBy = await _deptStaffRepository.GetDeptStaffByEmail(delegation.DelegatedByEmail);
            Delegation delegationFromRepo = await _delegationRepository.GetDelegationByDelegatedByEmailAndStartDate(delegation.DelegatedByEmail, delegation.StartDate);
            if (delegationFromRepo != null)
            {
                DeptStaff delegatedTo = await _deptStaffRepository.GetDeptStaffByEmail(delegation.DelegatedToEmail);
                if (delegatedTo != null && delegatedBy.DepartmentName == delegatedTo.DepartmentName)
                {
                    delegationFromRepo.DelegatedTo = delegation.DelegatedTo;
                    delegationFromRepo.EndDate = delegation.EndDate;
                    delegationFromRepo.Comment = delegation.Comment;
                    return new ApiResponse { Success = true, Data = await _delegationRepository.UpdateDelegation() };
                }
                else
                {
                    return new ApiResponse { Success = false, Message = "Department name of the DeptHead and the DeptStaff getting delegated MUST be the same." };
                }
            }
            else
            {
                return new ApiResponse { Success = false, Message = "Cannot find the delegation" };
            }
        }
        public async Task<ApiResponse> DeleteDelegation(string delegatedByEmail, DateTime startDate)
        {
            Delegation delegationFromRepo = await _delegationRepository.GetDelegationByDelegatedByEmailAndStartDate(delegatedByEmail, startDate);
            if (delegationFromRepo != null)
            {
                return new ApiResponse { Success = true, Data = await _delegationRepository.DeleteDelegation(delegationFromRepo) };
            }
            else
            {
                return new ApiResponse { Success = false, Message = "Cannot find the delegation" };
            }
        }
    }
}