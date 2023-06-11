using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToolsBazaar.Domain.OrderAggregate;
using ToolsBazaar.Domain.ProductAggregate;

namespace ToolsBazaar.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ILogger<OrderController> _logger;
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        public OrderController(ILogger<OrderController> logger, IOrderRepository orderRepository, IProductRepository productRepository)
        {
            _logger = logger;
            _orderRepository = orderRepository;
            _productRepository = productRepository;
        }
        [HttpGet]
        public int CreateOrder(int productId, int quantity)
        {
            Product product = _productRepository.GetAll().Any(x => x.Id == productId) ? _productRepository.GetAll().Where(x => x.Id == productId).Select(x => x).FirstOrDefault() : null;

            if (product == null)
                return 0;
            List<OrderItem> orderItems = new List<OrderItem>();

            orderItems.Add(
                new OrderItem()
                {
                    Id = 0,
                    Product = product,
                    Quantity = quantity
                });

            Order order = new Order()
            {
                Id = 0,
                Customer = null,
                Items = orderItems
            };

            if (product.Price > 3000)
                _logger.LogWarning($"total price exceeds {product.Price}");

            return _orderRepository.CreateOrder(order);

        }
    }
}
