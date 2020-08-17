using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;
namespace SSIS.Repositories
{
    public interface IRetrievalItemRepository
    {
        Task<List<RetrievalItem>> GetAllRetrievalItems(string email);
    }
}