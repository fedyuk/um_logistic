using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UM_LOGISTIC_V1.Models.TransportationPicture
{
    public class TransportationPicture
    {
        public long Id { get; set; }
		[ForeignKey("TransportationApplication")]
        public long TransportationApplicationId { get; set; }
        public byte[] Image { get; set; }
    }
}