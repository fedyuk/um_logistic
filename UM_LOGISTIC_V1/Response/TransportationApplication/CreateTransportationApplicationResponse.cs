using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UM_LOGISTIC_V1.Response.TransportationApplication
{
    public class CreateTransportationApplicationResponse : BaseResponse
    {
        public UM_LOGISTIC_V1.Models.TransportationApplication.TransportationApplication Result { get; set; }
    }
}