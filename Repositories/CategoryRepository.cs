using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.Models;

namespace SSIS.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext _dbContext;

        public CategoryRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> CategoryExist(string name)
        {
            return await _dbContext.Categories.AnyAsync(c => c.Name == name);
        }

        public async Task<List<Category>> GetAll()
        {
            return await _dbContext.Categories.OrderBy(c => c.Name).ToListAsync();
        }

        public async Task<Category> GetCategoryByName(string name)
        {
            return await _dbContext.Categories.Where(c => c.Name == name).FirstOrDefaultAsync();
        }
    }
}