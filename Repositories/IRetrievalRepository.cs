<<<<<<< HEAD
﻿using SSIS.Models;
using SSIS.Payloads;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
=======
using System.Threading.Tasks;
using SSIS.Models;
>>>>>>> 43d56b6f56503484fac0cda95016988eff8fd940

namespace SSIS.Repositories
{
    public interface IRetrievalRepository
    {
        Task<int> CreateRetrieval(Retrieval retrieval);
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 43d56b6f56503484fac0cda95016988eff8fd940
