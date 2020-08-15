<<<<<<< HEAD
﻿using SSIS.Databases;
using SSIS.Models;
using SSIS.Payloads;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
=======
using System.Threading.Tasks;
using SSIS.Databases;
using SSIS.Models;
>>>>>>> 43d56b6f56503484fac0cda95016988eff8fd940

namespace SSIS.Repositories
{
    public class RetrievalRepository : IRetrievalRepository
    {
        private readonly DataContext _dbContext;
<<<<<<< HEAD
=======

>>>>>>> 43d56b6f56503484fac0cda95016988eff8fd940
        public RetrievalRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
<<<<<<< HEAD
        public async Task<int> CreateRetrieval(Retrieval retrieval)
        {
            _dbContext.Add(retrieval);
=======

        public async Task<int> CreateRetrieval(Retrieval retrieval)
        {
            _dbContext.Retrievals.Add(retrieval);
>>>>>>> 43d56b6f56503484fac0cda95016988eff8fd940
            return await _dbContext.SaveChangesAsync();
        }
    }
}