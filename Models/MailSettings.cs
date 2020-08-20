namespace SSIS.Models
{
    public class MailSettings
    {
        public string Sender { get; set; }
        public string Receiver { get; set; }
        public string SmtpServer { get; set; }
        public int Port { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}