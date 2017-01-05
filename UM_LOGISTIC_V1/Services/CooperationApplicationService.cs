﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using UM_LOGISTIC_V1.Models;
using UM_LOGISTIC_V1.Models.CooperationApplication;

namespace UM_LOGISTIC_V1.Services
{
    public class CooperationApplicationService
    {
        private DataBaseContext db = new DataBaseContext();

        public CooperationApplication GetCooperationApplication(long id)
        {
            var application = db.CooperationApplications.Find(id);
            return application;
        }

        public bool CreateCooperationApplication(CooperationApplication application)
        {
            if (application != null)
            {
                db.CooperationApplications.Add(application);
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

        public bool UpdateCooperationApplication(CooperationApplication application)
        {
            var applicationToUpdate = db.CooperationApplications.Find(application.Id);
            if (applicationToUpdate != null)
            {
                applicationToUpdate.FullName = application.FullName;
                applicationToUpdate.ResidenceAddress = application.ResidenceAddress;
                applicationToUpdate.ParkingPlace = application.ParkingPlace;
                applicationToUpdate.ContactPhone = application.ContactPhone;
                applicationToUpdate.IsPhysicalPerson = application.IsPhysicalPerson;
                applicationToUpdate.IsBussinessPerson = application.IsBussinessPerson;
                applicationToUpdate.CarModel = application.CarModel;
                applicationToUpdate.TransportLength = application.TransportLength;
                applicationToUpdate.TransportWidth = application.TransportWidth;
                applicationToUpdate.TransportHeight = application.TransportHeight;
                applicationToUpdate.TransportWeight = application.TransportWeight;
                applicationToUpdate.TransportCapacity = application.TransportCapacity;
                applicationToUpdate.TransportArrow = application.TransportArrow;
                applicationToUpdate.WorkCost = application.WorkCost;
                applicationToUpdate.WorkTypeId = application.WorkTypeId;
                applicationToUpdate.DeliveryCost = application.DeliveryCost;
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

        public bool RemoveCooperationApplication(long id)
        {
            var applicationToDelete = db.CooperationApplications.Find(id);
            if (applicationToDelete != null)
            {
                db.CooperationApplications.Remove(applicationToDelete);
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

        public List<CooperationApplication> GetCooperationApplications(int page, int count)
        {
            var applications = from u in db.CooperationApplications
                        orderby u.Id ascending
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