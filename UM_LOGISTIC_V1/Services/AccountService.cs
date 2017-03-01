using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using UM_LOGISTIC_V1.Models;
using UM_LOGISTIC_V1.Models.Account;

namespace UM_LOGISTIC_V1.Services
{
    public class AccountService
    {
        private DataBaseContext db = new DataBaseContext();

        public Account GetAccount(long id)
        {
            var account = db.Accounts.Find(id);
            return account;
        }

        public bool CreateAccount(Account account)
        {
            account.CreatedOn = DateTime.Now;
            account.ModifiedOn = account.CreatedOn;
            if (account != null)
            {
                db.Accounts.Add(account);
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

        public bool UpdateAccount(Account account)
        {
            var accountToUpdate = db.Accounts.Find(account.Id);
            if (accountToUpdate != null)
            {
                accountToUpdate.ModifiedOn = DateTime.Now;
                accountToUpdate.FullName = account.FullName;
                accountToUpdate.HomePhone = account.HomePhone;
                accountToUpdate.WorkPhone = account.WorkPhone;
                accountToUpdate.Country = account.Country;
                accountToUpdate.Region = account.Region;
                accountToUpdate.City = account.City;
                accountToUpdate.Street = account.Street;
                db.Entry(accountToUpdate).State = EntityState.Modified;
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

        public bool RemoveAccount(long id)
        {
            var accountToDelete = db.Accounts.Find(id);
            if (accountToDelete != null)
            {
                db.Accounts.Remove(accountToDelete);
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

        public List<Account> GetAccounts(int page, int count)
        {
            var accounts = from a in db.Accounts
                        orderby a.Id ascending
                        select a;
            if (accounts == null)
            {
                return null;
            }
            var limitedAccounts = accounts.Skip(count * page).Take(count).ToList();
            return limitedAccounts;
        }
    }
}