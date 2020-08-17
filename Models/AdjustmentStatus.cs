using System.Text.Json.Serialization;
using Newtonsoft.Json.Converters;

namespace SSIS.Models
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum AdjustmentStatus { APPLIED, ISSUED }
}