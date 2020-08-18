using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Controllers;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;

namespace SSIS.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IItemRepository _itemRepository;
        private readonly ISupplierRepository _supplierRepository;
        private readonly IStoreStaffRepository _storeStaffRepository;
        public OrderService(IOrderRepository orderRepository, IItemRepository itemRepository, ISupplierRepository supplierRepository, IStoreStaffRepository storeStaffRepository)
        {
            _orderRepository = orderRepository;
            _itemRepository = itemRepository;
            _supplierRepository = supplierRepository;
            _storeStaffRepository = storeStaffRepository;
        }

        public async Task<ApiResponse> CreateOrder(List<Order> orders, string orderedByEmail)
        {
            StoreStaff orderedBy = await _storeStaffRepository.GetStoreStaffByEmail(orderedByEmail);
            foreach (var order in orders)
            {
                Order orderFromRepo = await _orderRepository.GetOrderBySupplierAndDate(order.SupplierId, DateTime.Now.Date);
                if (orderFromRepo != null)
                {
                    // Existing order
                    foreach (var orderItem in order.OrderItems)
                    {
                        Item itemFromRepo = await _itemRepository.GetItemById(orderItem.ItemId);
                        if (itemFromRepo != null)
                        {
                            // Existing orderItem
                            OrderItem orderItemFromRepo = orderFromRepo.OrderItems.Where(oi => oi.ItemId == itemFromRepo.Id).FirstOrDefault();
                            if (orderItemFromRepo != null)
                                orderItemFromRepo.OrderedQty += orderItem.OrderedQty;
                            else
                                orderFromRepo.OrderItems.Add(orderItem);
                        }
                    }
                }
                else
                {
                    Guid orderId = Guid.NewGuid();
                    Supplier supplier = await _supplierRepository.GetSupplierById(order.SupplierId);
                    if (supplier != null)
                    {
                        Order newOrder = new Order
                        {
                        Id = orderId,
                        SupplierId = supplier.Id,
                        OrderedBy = orderedBy,
                        OrderedOn = DateTime.Now,
                        Status = OrderStatus.ORDERED
                        };
                        newOrder.OrderItems = new List<OrderItem>();
                        foreach (var orderItem in order.OrderItems)
                        {
                            Item itemFromRepo = await _itemRepository.GetItemById(orderItem.ItemId);
                            if (itemFromRepo != null)
                                newOrder.OrderItems.Add(orderItem);
                        }
                        await _orderRepository.CreateOrder(newOrder);
                    }
                }

            }
            return new ApiResponse { Success = true };
        }

        public async Task<ApiResponse> GetAllOrders()
        {
            return new ApiResponse { Success = true, Data = await _orderRepository.GetAll() };
        }

        public async Task<ApiResponse> ReceiveOrder(Guid orderId, List<OrderItem> orderItems, string receivedByEmail)
        {
            Order orderFromRepo = _orderRepository.GetOrderById(orderId);
            if (orderFromRepo != null)
            {
                StoreStaff receivedBy = await _storeStaffRepository.GetStoreStaffByEmail(receivedByEmail);
                foreach (var orderItem in orderItems)
                {
                    Item itemFromRepo = await _itemRepository.GetItemById(orderItem.ItemId);
                    if (itemFromRepo != null)
                    {
                        OrderItem orderItemFromRepo = orderFromRepo.OrderItems.Where(oi => oi.ItemId == orderItem.ItemId).FirstOrDefault();
                        if (orderItemFromRepo != null)
                        {
                            orderItemFromRepo.DeliveredQty = orderItem.DeliveredQty;
                            orderItemFromRepo.Remarks = orderItem.Remarks;
                            itemFromRepo.Stock += orderItem.DeliveredQty;
                        }
                    }
                }
                orderFromRepo.ReceivedBy = receivedBy;
                orderFromRepo.ReceivedOn = DateTime.Now;
                orderFromRepo.Status = OrderStatus.RECEIVED;
            }
            return new ApiResponse { Success = true };
        }
    }
}