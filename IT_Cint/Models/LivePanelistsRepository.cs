using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RespondentMap.Models;

namespace IT_Cint.Models
{
    public class LivePanelistsRepository
    {

        private RespondentMap.Models.PanelistsDataContext panelistsDB;


        public LivePanelistsRepository()
        {
            panelistsDB = new PanelistsDataContext();
        }


        public IQueryable<Panelist> showLivePanelists()
        {

            var allPanelists = (from lp in panelistsDB.Panelists
                                where (lp.Status == 1 && lp.Finished == null && lp.Started != null)
                                orderby lp.Started descending
                                select lp).Take(100);

            return allPanelists;

        }

    }
}