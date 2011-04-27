using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IT_Cint.Models
{
    public class CountryCount
    {
        public int count { get; set; }
        public string country { get; set; }
        private PanelistsDataContext panelistsDB;


        public IQueryable<CountryCount> getRespondentsCount()
        {
            var query = from lp in panelistsDB.Panelists
                        where (lp.Status == 1 && lp.Finished == null && lp.Started != null)
                        group lp by lp.CountryName into grp
                        select new CountryCount
                        {
                            country = grp.Key,
                            count = grp.Count()
                        };
            return query;

        }

    }

}