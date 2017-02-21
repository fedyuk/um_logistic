using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using UM_LOGISTIC_V1.Models.TransportationApplication;

namespace UM_LOGISTIC_V1.Models.TransportationPicture
{
    public class TransportationPicture
    {
        public long Id { get; set; }
		[ForeignKey("TransportationApplication")]
        public long TransportationApplicationId { get; set; }
		public virtual TransportationApplication.TransportationApplication TransportationApplication { get; set; }
        public string Image { get; set; }
    }
}