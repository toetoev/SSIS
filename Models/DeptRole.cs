using System;

namespace SSIS.Models
{
    public static class DeptRole
    {
        public const string Employee = "EMPLOYEE";
        public const string DeptRep = "DEPTREP";
        public const string DeptHead = "DEPTHEAD";
        public const string All = DeptHead + "," + DeptRep + "," + Employee;

        public static bool isDeptStaff(string role)
        {
            return Employee.Equals(role) || DeptRep.Equals(role) || DeptHead.Equals(role);
        }
    }
}