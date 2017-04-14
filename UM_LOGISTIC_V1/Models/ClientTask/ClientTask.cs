using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using UM_LOGISTIC_V1.Models.Base;

namespace UM_LOGISTIC_V1.Models.ClientTask
{
    public class ClientTask : Entity
    {
        public string Title { get; set; }
        [ForeignKey("Type")]
        public long TypeId { get; set; }
        public virtual ClientTaskType Type { get; set; }
    }
}