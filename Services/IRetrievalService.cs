<<<<<<< HEAD
﻿using SSIS.Payloads;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
=======
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Payloads;
>>>>>>> 43d56b6f56503484fac0cda95016988eff8fd940

namespace SSIS.Services
{
    public interface IRetrievalService
    {
        Task<ApiResponse> CreateRetrieval(List<Guid> requisitionIds, string email);
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 43d56b6f56503484fac0cda95016988eff8fd940
