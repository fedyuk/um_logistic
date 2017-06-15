using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using UM_LOGISTIC_V1.Models.Base;

namespace UM_LOGISTIC_V1.Models.UserPicture
{
    public class UserPicture : Entity
    {
        public string Image { get; set; }
        public virtual User.User User { get; set; }
        [ForeignKey("User")]
        public long UserId { get; set; }
    }
}