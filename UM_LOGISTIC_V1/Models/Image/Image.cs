using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using UM_LOGISTIC_V1.Models.Base;

namespace UM_LOGISTIC_V1.Models.Image
{
    public class Image : Entity
    {
        public string Data { get; set; }
        public string Key { get; set; }
    }
}