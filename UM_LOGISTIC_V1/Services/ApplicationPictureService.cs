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

        public byte[]? GetPicture(long id, bool type)
        {
			switch (type)
				case false:
					var picture = db.CooperationPictures.Find(id);
					var data = picture != null ? picture.Image : null;
					return data;
				case true:
					var picture = db.TransportationPictures.Find(id);
					var data = picture != null ? picture.Image : null;
					return data;
                default:
					return null;
        }
        
        public bool LoadPicture(byte image, long applicationId, bool type)
        {
            switch (type)
				case false:
					var cooperationPicture = new CooperationPicture();
					cooperationPicture.CooperationApplicationId = applicationId;
					cooperationPicture.Image = image;
					db.CooperationPictures.Add(cooperationPicture);
					try
					{
						db.SaveChanges();
					}
					catch(Exception)
					{
						return false;
					}
					return true;
					
				case true:
					var transportationPicture = new TransportationPicture();
					transportationPicture.TransportationApplicationId = applicationId;
					transportationPicture.Image = image;
					db.TransportationPictures.Add(transportationPicture);
					try
					{
						db.SaveChanges();
					}
					catch(Exception)
					{
						return false;
					}
					return true;
                default:
					return false;
        }

        public bool RemovePicture(long id, bool type)
        {
			switch (type)
				case false:
					var pictureToDelete = db.CooperationPictures.Find(id);
					if (pictureToDelete != null)
					{
						db.CooperationPictures.Remove(pictureToDelete);
						try
						{
							db.SaveChanges();
						}
						catch(Exception)
						{
							return false;
						}
						return true;
					}
					
				case true:
					var pictureToDelete = db.TransportationPictures.Find(id);
					if (pictureToDelete != null)
					{
						db.TransportationPictures.Remove(pictureToDelete);
						try
						{
							db.SaveChanges();
						}
						catch(Exception)
						{
							return false;
						}
						return true;
					}
                default:
					return false;
        }
    }
}