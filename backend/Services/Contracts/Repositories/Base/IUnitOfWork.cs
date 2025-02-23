using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Repositories.Base
{
    public interface IUnitOfWork
    {
        Task<int> SaveChangesAsync();
    }
}
