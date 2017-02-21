using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using UM_LOGISTIC_V1.Models;
using UM_LOGISTIC_V1.Models.CooperationPicture;
using UM_LOGISTIC_V1.Models.TransportationPicture;

namespace UM_LOGISTIC_V1.Services
{
    public class ApplicationPictureService
    {
        private DataBaseContext db = new DataBaseContext();

        public string GetPicture(long id, bool type)
        {
            switch (type)
            {
                case false:
                    var picture = db.CooperationPictures.Find(id);
                    var data = picture != null ? Convert.ToBase64String(picture.Image) : null;
                    return data;
                case true:
                    var picture2 = db.TransportationPictures.Find(id);
                    var data2 = picture2 != null ? Convert.ToBase64String(picture2.Image) : null;
                    return data2;
                default:
                    return null;
            }
        }
        
        public bool LoadPicture(string image, long applicationId, bool type)
        {
            switch (type)
            {
                case false:
                    var cooperationPicture = new CooperationPicture();
                    cooperationPicture.CooperationApplicationId = applicationId;
                    cooperationPicture.Image = Convert.FromBase64String(image);
                    db.CooperationPictures.Add(cooperationPicture);
                    try
                    {
                        db.SaveChanges();
                    }
                    catch (Exception)
                    {
                        return false;
                    }
                    return true;

                case true:
                    var transportationPicture = new TransportationPicture();
                    transportationPicture.TransportationApplicationId = applicationId;
                    transportationPicture.Image = Convert.FromBase64String(image);
                    db.TransportationPictures.Add(transportationPicture);
                    try
                    {
                        db.SaveChanges();
                    }
                    catch (Exception)
                    {
                        return false;
                    }
                    return true;
                default:
                    return false;
            }
        }

        public bool RemovePicture(long id, bool type)
        {
            switch (type)
            {
                case false:
                    var pictureToDelete = db.CooperationPictures.Find(id);
                    if (pictureToDelete != null)
                    {
                        db.CooperationPictures.Remove(pictureToDelete);
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

                case true:
                    var pictureToDelete2 = db.TransportationPictures.Find(id);
                    if (pictureToDelete2 != null)
                    {
                        db.TransportationPictures.Remove(pictureToDelete2);
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
                default:
                    return false;
            }
        }
    }
}