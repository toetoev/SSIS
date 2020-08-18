namespace SSIS.Models
{
    public static class StoreRole
    {
        // CLERK, SUPERVISOR, MANAGER
        public const string Clerk = "CLERK";
        public const string Supervisor = "SUPERVISOR";
        public const string Manager = "MANAGER";

        public static bool isStoreStaff(string role)
        {
            return Clerk.Equals(role) || Supervisor.Equals(role) || Manager.Equals(role);
        }
    }
}