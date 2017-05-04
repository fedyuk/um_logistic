using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UM_LOGISTIC_V1.Models;
using UM_LOGISTIC_V1.Models.ApplicationTrash;

namespace UM_LOGISTIC_V1.Services
{
    public class ApplicationTrashService
    {
        private DataBaseContext db = new DataBaseContext();

        public bool InsertTrashApplication(long userId, long applicationId, bool type)
        {
            var applicationTrash = new ApplicationTrash();
            applicationTrash.CreatedOn = DateTime.Now;
            applicationTrash.ModifiedOn = DateTime.Now;
            applicationTrash.CreatedBy = userId;
            applicationTrash.UserId = userId;
            switch(type)
            {
                case true:
                    applicationTrash.TransportationApplicationId = applicationId;
                    break;
                case false:
                    applicationTrash.CooperationApplicationId = applicationId;
                    break;
            }
            db.ApplicationsTrash.Add(applicationTrash);
            try
            {
                db.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }
    }
}