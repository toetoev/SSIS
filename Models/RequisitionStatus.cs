using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace SSIS.Models
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum RequisitionStatus
    {
        APPLIED,
        APPROVED,
        REJECTED,
        PROCESSING_RETRIEVAL,
        PENDING_COLLECTION,
        DELIVERED
    }
}