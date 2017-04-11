using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using UM_LOGISTIC_V1.Models;

namespace UM_LOGISTIC_V1.Services
{
    public class ApplicationService
    {
        private DataBaseContext db = new DataBaseContext();

        public long AcceptApplication(bool type, long id)
        {
            switch(type)
            {
                case true:
                    var transportationApplication = db.TransportationApplications.Find(id);
                    if(transportationApplication != null)
                    {
                        transportationApplication.Filtered = true;
                        db.Entry(transportationApplication).State = EntityState.Modified;
                        try
                        {
                            db.SaveChanges();
                            return transportationApplication.Id;
                        }
                        catch(Exception)
                        {
                            return 0L;
                        }
                    }
                    break;
                case false:
                    var cooperationApplication = db.CooperationApplications.Find(id);
                    if (cooperationApplication != null)
                    {
                        cooperationApplication.Filtered = true;
                        db.Entry(cooperationApplication).State = EntityState.Modified;
                        try
                        {
                            db.SaveChanges();
                            return cooperationApplication.Id;
                        }
                        catch (Exception)
                        {
                            return 0L;
                        }
                    }
                    break;
            }
            return 0L;
        }
    }
}