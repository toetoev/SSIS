using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Services
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetAll();
    }
}