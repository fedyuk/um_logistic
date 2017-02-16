using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UM_LOGISTIC_V1.Models.CooperationPicture
{
    public class CooperationPicture
    {
        public long Id { get; set; }
		[ForeignKey("CooperationApplication")]
        public long CooperationApplicationId { get; set; }
		public virtual CooperationApplication CooperationApplication { get; set; }
        public byte[] Image { get; set; }
    }
}