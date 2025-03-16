using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.ChatBot
{
    public class Request_Response
    {
        public class ChatRequest
        {
            public string Message { get; set; }
        }

        public class ChatResponse
        {
            public string Reply { get; set; }
        }
    }
}
