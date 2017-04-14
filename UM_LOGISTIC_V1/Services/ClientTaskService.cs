using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UM_LOGISTIC_V1.Models;
using UM_LOGISTIC_V1.Models.ClientTask;
using UM_LOGISTIC_V1.Request.ClientTask;

namespace UM_LOGISTIC_V1.Services
{
    public class ClientTaskService
    {
        private DataBaseContext db = new DataBaseContext();

        public bool CreateCallFeedback(CallFeedbackRequest request)
        {
            var feedBack = new ClientTask();
            var title = "Телефон: " + request.Phone + "\r\n";
            title += "Ім'я: " + request.Name + "\r\n";
            title += "Запитання: " + request.Question + "\r\n";
            feedBack.Title = title;
            feedBack.TypeId = 1;
            feedBack.CreatedOn = DateTime.Now;
            feedBack.ModifiedOn = DateTime.Now;
            db.ClientTasks.Add(feedBack);
            try
            {
                db.SaveChanges();
                return true;
            }
            catch(Exception)
            {
                return false;
            }
        }
    }
}