using System.Linq;
using System.Threading.Tasks;
using SSIS.Databases;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;

namespace SSIS.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _itemRepository;

        public ItemService(IItemRepository itemRepository){
            _itemRepository = itemRepository;
        }
        public async Task<ApiResponse> GetItemById(Item item){
            if(! await _itemRepository.ItemExist(item.Id)){
            return new ApiResponse { Success = true, Data = await _itemRepository.GetItemById(item)};
            }
            return new ApiResponse { Success = false, Message = "item does not exist" };
            
        }
        
        public async Task<ApiResponse> GetAllItems(){
            return new ApiResponse { Success = true, Data = await _itemRepository.GetAll()};
        }

        public async Task<ApiResponse> GetAllItemsByCategory(string name){
            return new ApiResponse {Success = true, Data = await _itemRepository.GetItemsByCategory(name)};
        }



    }
}