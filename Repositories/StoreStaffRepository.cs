<<<<<<< HEAD
﻿using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
=======
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.Models;
>>>>>>> 43d56b6f56503484fac0cda95016988eff8fd940

namespace SSIS.Repositories
{
    public class StoreStaffRepository : IStoreStaffRepository
    {
        private readonly DataContext _dbContext;

        public StoreStaffRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<StoreStaff> GetStoreStaffByEmail(string email)
        {
            return await _dbContext.StoreStaffs.Where(ss => ss.Email == email).SingleAsync();
        }
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 43d56b6f56503484fac0cda95016988eff8fd940
