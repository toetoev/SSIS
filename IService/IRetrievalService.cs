﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.IService
{
	public interface IRetrievalService
	{
		Task<ApiResponse> CreateRetrieval(List<Guid> requisitionIds, string email);
		Task<ApiResponse> GetAllRetrievalsByCurrentStaff(string currentStaffEmail);
		Task<ApiResponse> DeleteRetrieval(Guid retrievalId);
		Task<ApiResponse> UpdateRetrievalActualQuantity(Guid retrievalId, List<RetrievalItem> retrievalItems, string email);
	}
}