using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Repositories.Base
{
    public interface IGeneralRepository<TEntity, Tkey> where TEntity : BaseEntity<Tkey>
    {
        Task<IEnumerable<TEntity>> GetAll();
        Task<TEntity> GetById(Tkey id);
        TEntity Create(TEntity entity);
        Task<TEntity> CreateAsync(TEntity entity);
        bool Delete(TEntity entity);
        bool Update(TEntity entity);
    }
}
