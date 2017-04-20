using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
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

        public bool DeclineApplication(bool type, long id)
        {
            switch (type)
            {
                case true:
                    var transportationApplication = db.TransportationApplications.Find(id);
                    if (transportationApplication != null)
                    {
                        db.TransportationApplications.Remove(transportationApplication);
                        try
                        {
                            db.SaveChanges();
                            return true;
                        }
                        catch (Exception)
                        {
                            return false;
                        }
                    }
                    break;
                case false:
                    var cooperationApplication = db.CooperationApplications.Find(id);
                    if (cooperationApplication != null)
                    {
                        db.CooperationApplications.Remove(cooperationApplication);
                        try
                        {
                            db.SaveChanges();
                            return true;
                        }
                        catch (Exception)
                        {
                            return false;
                        }
                    }
                    break;
            }
            return false;
        }

        public long GetNotFilteredApplicationsCount()
        {
            var transportationsCount = db.TransportationApplications.Count(t => t.Filtered == false);
            var cooperationsCount = db.CooperationApplications.Count(t => t.Filtered == false);
            return transportationsCount + cooperationsCount;
        }
    }
}