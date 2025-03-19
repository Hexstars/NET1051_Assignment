using Microsoft.AspNetCore.Mvc;
using static Services.Models.ChatBot.Request_Response;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly Dictionary<string, string> _responses = new()
        {
            { "giày tây", "Bạn có thể xem các mẫu giày tây tại: /products" },
            { "giá", "Giá giày tây dao động từ 1 triệu đến 5 triệu VNĐ." },
            { "mua ở đâu", "Bạn có thể mua giày tây tại: /products" },
            { "bảo hành", "Giày tây của chúng tôi được bảo hành 12 tháng." },
            { "chất liệu", "Giày tây của chúng tôi được làm từ da bò thật, da lộn và vải cao cấp." },
            { "size", "Chúng tôi có đầy đủ size từ 38 đến 44." },
            { "màu sắc", "Các mẫu giày có màu đen, nâu, xám và xanh navy." },
            { "giao hàng", "Chúng tôi giao hàng toàn quốc trong 3-5 ngày làm việc." },
            { "phí vận chuyển", "Miễn phí vận chuyển cho đơn hàng từ 1 triệu VNĐ trở lên." },
            { "đổi trả", "Bạn có thể đổi trả trong vòng 7 ngày nếu sản phẩm bị lỗi." },
            { "thanh toán", "Chúng tôi hỗ trợ thanh toán qua thẻ ngân hàng, ví điện tử và COD." },
            { "ưu đãi", "Hiện tại chúng tôi có chương trình giảm 10% cho khách hàng mới." },
            { "cửa hàng", "Cửa hàng của chúng tôi có mặt tại Hà Nội, TP.HCM và Đà Nẵng." }
        };

        [HttpPost]
        public IActionResult Chat([FromBody] ChatRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest(new ChatResponse { Reply = "Vui lòng nhập câu hỏi!" });
            }

            var lowerMessage = request.Message.ToLower();

            // Tìm phản hồi phù hợp
            var reply = _responses.FirstOrDefault(r => lowerMessage.Contains(r.Key)).Value;

            if (string.IsNullOrEmpty(reply))
            {
                reply = "Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Bạn có thể hỏi về: giày tây, giá, mua ở đâu, bảo hành, chất liệu, size, màu sắc, giao hàng, phí vận chuyển, đổi trả, thanh toán, ưu đãi, cửa hàng.";
            }

            return Ok(new ChatResponse { Reply = reply });
        }
    }
}
   