using System;
using System.Collections.Generic;
using System.Text;
using IT_Cint.Models;

namespace IT_Cint.Models
{
    interface ILivePanelistsRepository
    {
        IList<Panelist> showAll();
    }
}