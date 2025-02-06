using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Services.Contracts.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories.Base
{
    public abstract class GeneralRepository<TEntity, TKey> : IGeneralRepository<TEntity, TKey> where TEntity : BaseEntity<TKey>
    {
        protected readonly ApplicationDbContext _context;
        private readonly DbSet<TEntity> _entity;
        public GeneralRepository(ApplicationDbContext context)
        {
            _context = context;
            _entity = _context.Set<TEntity>();
        }
        public virtual async Task<IEnumerable<TEntity>> GetAll()
        {
            return await _entity.ToListAsync();
        }
        public virtual async Task<TEntity> GetById(TKey id)
        {
            var entity = await _entity.AsNoTracking().FirstOrDefaultAsync(x => x.Id!.Equals(id));
            return entity!;
        }
        public virtual TEntity Create(TEntity entity)
        {
            _entity.Add(entity);
            return entity;
        }
        public virtual async Task<TEntity> CreateAsync(TEntity entity)
        {
            await _entity.AddAsync(entity);
            return entity;
        }
        public virtual bool Delete(TEntity entity)
        {
            _entity.Remove(entity);
            return true;
        }
        public virtual bool Update(TEntity entity)
        {
            _entity.Update(entity);
            return true;
        }
    }
}
