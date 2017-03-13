using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using UM_LOGISTIC_V1.Models;
using UM_LOGISTIC_V1.Models.TransportationApplication;

namespace UM_LOGISTIC_V1.Services
{
    public class TransportationApplicationService
    {
        private DataBaseContext db = new DataBaseContext();

        public TransportationApplication GetTransportationApplication(long id)
        {
            var application = db.TransportationApplications.Find(id);
            return application;
        }

        public long? CreateTransportationApplication(TransportationApplication application)
        {
            if (application != null)
            {
                application.CreatedOn = DateTime.Now;
                application.ModifiedOn = application.CreatedOn;
                db.TransportationApplications.Add(application);
                try
                {
                    db.SaveChanges();
                }
                catch (Exception)
                {
                    return null;
                }
                return application.Id;
            }
            return null;
        }

        public bool UpdateTransportationApplication(TransportationApplication application)
        {
            var applicationToUpdate = db.TransportationApplications.Find(application.Id);
            if (applicationToUpdate != null)
            {
                applicationToUpdate.Name = application.Name;
                applicationToUpdate.ContactPhone = application.ContactPhone;
                applicationToUpdate.SendAddress = application.SendAddress;
                applicationToUpdate.DeliveryAddress = application.DeliveryAddress;
                applicationToUpdate.CompleteDate = application.CompleteDate;
                applicationToUpdate.ShipmentType = application.ShipmentType;
                applicationToUpdate.ShipmentLength = application.ShipmentLength;
                applicationToUpdate.ShipmentWidth = application.ShipmentWidth;
                applicationToUpdate.ShipmentHeight = application.ShipmentHeight;
                applicationToUpdate.ShipmentCapacity = application.ShipmentCapacity;
                applicationToUpdate.ShipmentWeight = application.ShipmentWeight;
                applicationToUpdate.ModifiedOn = DateTime.Now;
                db.Entry(applicationToUpdate).State = EntityState.Modified;
                try
                {
                    db.SaveChanges();
                }
                catch (Exception)
                {
                    return false;
                }
                return true;
            }
            return false;
        }

        public bool RemoveTransportationApplication(long id)
        {
            var applicationToDelete = db.TransportationApplications.Find(id);
            if (applicationToDelete != null)
            {
                db.TransportationApplications.Remove(applicationToDelete);
                try
                {
                    db.SaveChanges();
                }
                catch (Exception)
                {
                    return false;
                }
                return true;
            }
            return false;
        }

        public List<TransportationApplication> GetTransportationApplications(int page, int count)
        {
            var applications = from u in db.TransportationApplications
                               orderby u.ModifiedOn descending
                               select u;
            if (applications == null)
            {
                return null;
            }
            var limitedApplications = applications.Skip(count * page).Take(count).ToList();
            return limitedApplications;
        }
    }
}